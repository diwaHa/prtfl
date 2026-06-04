import { NextResponse } from "next/server";
import { z } from "zod";
import { contactFormSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    console.log("Nova Studio - New Contact Form Submission:", validatedData);

    return NextResponse.json(
      { message: "Form submission processed successfully." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0]?.message || "Validation failed." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process form submission. Please try again later." },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
