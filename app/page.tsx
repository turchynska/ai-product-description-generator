"use client";

import { useState } from "react";

export default function Home() {
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [material, setMaterial] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [tone, setTone] = useState("Friendly and professional");
  const [keywords, setKeywords] = useState("");

  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    setIsLoading(true);
    setError("");
    setResult("");
    setCopied(false);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName,
          productType,
          material,
          targetAudience,
          tone,
          keywords,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCopy() {
    if (!result) return;

    await navigator.clipboard.writeText(result);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function fillExample() {
    setProductName("Personalized Dog Tag");
    setProductType("Pet accessory");
    setMaterial("Acrylic");
    setTargetAudience("Dog owners and pet lovers");
    setTone("Playful");
    setKeywords("custom dog tag, dog mom gift, personalized pet tag");
    setResult("");
    setError("");
    setCopied(false);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            AI Ecommerce Tool
          </p>

          <h1 className="text-4xl font-bold text-slate-900">
            AI Product Description Generator
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Generate ecommerce titles, descriptions, bullet points, and SEO
            keywords for product listings.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Product details
              </h2>

              <button
                onClick={fillExample}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Fill example
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Product name *
                </label>
                <input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Example: Personalized Dog Tag"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Product type *
                </label>
                <input
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  placeholder="Example: Pet accessory"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Material
                </label>
                <input
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="Example: Acrylic, wood, cotton, metal"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Target audience
                </label>
                <input
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="Example: Dog owners, moms, gift buyers"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                >
                  <option>Friendly and professional</option>
                  <option>Playful</option>
                  <option>Luxury</option>
                  <option>Minimalist</option>
                  <option>Emotional</option>
                  <option>SEO-focused</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Keywords
                </label>
                <input
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="Example: custom dog tag, pet gift, dog mom"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isLoading ? "Generating..." : "Generate Description"}
              </button>

              {error && (
                <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </p>
              )}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Generated result
              </h2>

              {result && (
                <button
                  onClick={handleCopy}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>

            <div className="min-h-[520px] rounded-xl border border-slate-200 bg-slate-50 p-4">
              {result ? (
                <pre className="whitespace-pre-wrap text-sm leading-6 text-slate-800">
                  {result}
                </pre>
              ) : (
                <div className="flex h-full min-h-[480px] items-center justify-center text-center">
                  <p className="max-w-sm text-sm text-slate-500">
                    Fill in the product details and click Generate Description.
                    The AI-generated product listing will appear here.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
