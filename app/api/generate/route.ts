import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      productName,
      productType,
      material,
      targetAudience,
      tone,
      keywords,
    } = body;

    if (!productName || !productType) {
      return NextResponse.json(
        { error: "Product name and product type is required" },
        { status: 400 },
      );
    }

    const prompt = `
You are an expert ecommerce copywriter.

Create a professional product listing based on this information:

Product name: ${productName}
Product type: ${productType}
Material: ${material || "Not provided"}
Target audience: ${targetAudience || "General buyers"}
Tone: ${tone || "Friendly and professional"}
Keywords: ${keywords || "Not provided"}

Return the answer ONLY in this format:

TITLE:
Write one SEO-friendly product title.

DESCRIPTION:
Write a clear and persuasive product description.

BULLET POINTS:
- Write 5 strong bullet points.

SEO KEYWORDS:
Write 10 SEO keywords separated by commas.
`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const textBlock = message.content.find((block) => block.type === "text");

    return NextResponse.json({
      result: textBlock?.text || "No result generated.",
    });
  } catch (error) {
    console.error("Claude API error:", error);

    return NextResponse.json(
      { error: "Something went wrong while generating the description." },
      { status: 500 },
    );
  }
}

