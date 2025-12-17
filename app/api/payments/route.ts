import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, amount, customerDetails, items } = body;

    // Midtrans Server Key from environment
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const isProduction = process.env.MIDTRANS_ENVIRONMENT === "production";

    if (!serverKey) {
      return NextResponse.json(
        { error: "Midtrans server key not configured" },
        { status: 500 }
      );
    }

    // Create authorization header (Base64 encoded server key)
    const authString = Buffer.from(serverKey + ":").toString("base64");

    // Midtrans API endpoint
    const midtransUrl = isProduction
      ? "https://app.midtrans.com/snap/v1/transactions"
      : "https://app.sandbox.midtrans.com/snap/v1/transactions";

    // Prepare transaction data
    const transactionData = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      customer_details: customerDetails,
      item_details: items,
    };

    // Make request to Midtrans
    const response = await fetch(midtransUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(transactionData),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error_messages || "Payment failed" },
        { status: response.status }
      );
    }

    // Return the transaction token
    return NextResponse.json({
      token: data.token,
      redirect_url: data.redirect_url,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
