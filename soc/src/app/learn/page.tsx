export default function LearnPage() {
    return (
      <div className="min-h-screen bg-black pt-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gradient mb-8">
            Understanding DePIN Networks
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">What is DePIN?</h2>
              <p className="text-gray-300">
                Decentralized Physical Infrastructure Networks (DePIN) represent the next evolution
                in distributed computing...
              </p>
            </section>
            
            {/* Add more sections as needed */}
          </div>
        </div>
      </div>
    );
  }