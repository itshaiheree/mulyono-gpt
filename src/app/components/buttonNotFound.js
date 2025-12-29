"use client";
import Link from "next/link";

export default function ButtonNotFound() {
  return (
<div className="flex justify-center mt-6">
  <div className="flex flex-col md:flex-row gap-3">
    <Link href="/" className="btn btn-primary">
      Back to Home
    </Link>
    <button
      onClick={() => window.history.back()}
      className="btn btn-outline"
    >
      Go Back
    </button>
  </div>
</div>

  );
}