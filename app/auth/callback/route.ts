// app/auth/callback/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=Authorization code is missing`);
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error.message);
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent("Failed to authenticate. Please try again.")}`);
    }

    // Redirect to the /project page after successful email confirmation
    return NextResponse.redirect(`${origin}/home`);
  } catch (err) {
    console.error("Auth callback error:", err);
    return NextResponse.redirect(`${origin}/login?error=Unexpected error occurred. Please try again.`);
  }
}