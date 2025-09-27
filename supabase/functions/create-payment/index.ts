// import "https://deno.land/x/xhr@0.1.0/mod.ts";
// import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

// const corsHeaders = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
// };

// serve(async (req) => {
//   // Handle CORS preflight requests
//   if (req.method === 'OPTIONS') {
//     return new Response(null, { headers: corsHeaders });
//   }

//   try {
//     const { appointmentData, userProfile } = await req.json();
    
//     // Validate required data
//     if (!appointmentData || !userProfile) {
//       return new Response(
//         JSON.stringify({ error: 'Missing appointment data or user profile' }),
//         { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
//       );
//     }

//     const irembopaySecretKey = Deno.env.get('IREMBO_PAY_SECRET_KEY');
    
//     if (!irembopaySecretKey) {
//       console.error('IREMBO_PAY_SECRET_KEY not found');
//       return new Response(
//         JSON.stringify({ error: 'Payment service configuration error' }),
//         { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
//       );
//     }

//     // Generate unique transaction ID
//     const transactionId = `TST-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
//     // Calculate expiry time (24 hours from now)
//     const expiryAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

//     // Prepare payment request
//     const paymentRequest = {
//       transactionId,
//       paymentAccountIdentifier: "TST-RWF",
//       customer: {
//         email: userProfile.email,
//         phoneNumber: userProfile.phone || "0780000001",
//         name: userProfile.full_name
//       },
//       paymentItems: [
//         {
//           unitAmount: Math.round(appointmentData.total_amount * 100), // Convert to cents
//           quantity: 1,
//           code: `CONSULTATION-${appointmentData.doctor_id.slice(-10)}`
//         }
//       ],
//       description: `Therapy consultation - ${appointmentData.duration_minutes} minutes`,
//       expiryAt,
//       language: "EN"
//     };

//     console.log('Creating payment with IremboPay:', paymentRequest);

//     // Call IremboPay API
//     const irembopayResponse = await fetch('https://api.sandbox.irembopay.com/payments/invoices', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'irembopay-secretKey': irembopaySecretKey
//       },
//       body: JSON.stringify(paymentRequest)
//     });

//     const responseText = await irembopayResponse.text();
//     console.log('IremboPay response status:', irembopayResponse.status);
//     console.log('IremboPay response:', responseText);

//     if (!irembopayResponse.ok) {
//       console.error('IremboPay API error:', responseText);
//       return new Response(
//         JSON.stringify({ 
//           error: 'Payment service error',
//           details: responseText
//         }),
//         { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
//       );
//     }

//     const paymentResponse = JSON.parse(responseText);
    
//     // Extract payment link URL from response
//     const paymentLinkUrl = paymentResponse.paymentLinkUrl || paymentResponse.data?.paymentLinkUrl;
    
//     if (!paymentLinkUrl) {
//       console.error('No payment link in response:', paymentResponse);
//       return new Response(
//         JSON.stringify({ 
//           error: 'Payment link not received',
//           response: paymentResponse
//         }),
//         { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
//       );
//     }

//     return new Response(
//       JSON.stringify({
//         success: true,
//         paymentLinkUrl,
//         transactionId,
//         expiryAt
//       }),
//       { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
//     );

//   } catch (error) {
//     console.error('Error in create-payment function:', error);
//     return new Response(
//       JSON.stringify({ 
//         error: 'Internal server error',
//         message: error instanceof Error ? error.message : 'Unknown error'
//       }),
//       { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
//     );
//   }
// });

// Supabase Edge Function: create-payment

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { appointmentData, userProfile } = await req.json();

    // Validate required data
    if (!appointmentData || !userProfile) {
      return new Response(
        JSON.stringify({ error: "Missing appointment data or user profile" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const irembopaySecretKey = Deno.env.get("IREMBO_PAY_SECRET_KEY");
    if (!irembopaySecretKey) {
      console.error("IREMBO_PAY_SECRET_KEY not found");
      return new Response(
        JSON.stringify({ error: "Payment service configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Generate unique transaction ID
    const transactionId = `TST-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Calculate expiry time (24 hours from now)
    const expiryAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    // ✅ FIXED: match Irembo API structure
    const paymentRequest = {
      transactionId,
      paymentAccountIdentifier: "TST-RWF",
      customer: {
        email: userProfile.email,
        phoneNumber: userProfile.phone || "0780000001",
        name: userProfile.full_name,
      },
      paymentItems: [
        {
          // ✅ FIXED: Do NOT multiply by 100 (Irembo expects amount in RWF)
          unitAmount: Math.round(appointmentData.total_amount),
          quantity: 1,
          // ✅ FIXED: Must use valid product code from your Irembo account
          code: "PC-aaf751b73f",
        },
      ],
      description: `Therapy consultation - ${appointmentData.duration_minutes} minutes`,
      expiryAt,
      language: "EN",
    };

    console.log("Creating payment with IremboPay:", paymentRequest);

    // Call IremboPay API
    const irembopayResponse = await fetch("https://api.sandbox.irembopay.com/payments/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "irembopay-secretKey": irembopaySecretKey,
      },
      body: JSON.stringify(paymentRequest),
    });

    const responseText = await irembopayResponse.text();
    console.log("IremboPay response status:", irembopayResponse.status);
    console.log("IremboPay response:", responseText);

    if (!irembopayResponse.ok) {
      return new Response(
        JSON.stringify({
          error: "Payment service error",
          details: responseText,
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const paymentResponse = JSON.parse(responseText);

    // ✅ FIXED: Proper extraction of payment link
    const paymentLinkUrl = paymentResponse?.data?.paymentLinkUrl;

    if (!paymentLinkUrl) {
      console.error("No payment link in response:", paymentResponse);
      return new Response(
        JSON.stringify({
          error: "Payment link not received",
          response: paymentResponse,
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        paymentLinkUrl,
        transactionId,
        expiryAt,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error in create-payment function:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
