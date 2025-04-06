import { Button } from "@/components/common/button";
import { Link } from "wouter";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2 mb-8">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link href="/dashboard">
        <Button>
          <Home className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
