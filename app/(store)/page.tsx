import { CategoryGrid } from "@/components/store/CategoryGrid";

const SPRING_COLLECTION = [
  {
    id: "spring-1",
    title: "Baby Shower Essentials",
    imageUrl:
      "https://images.unsplash.com/photo-1654894811891-3d291baaa011?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "spring-2",
    title: "Elegant Picnic Sets",
    imageUrl:
      "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "spring-3",
    title: "Wedding Guest Favors",
    imageUrl:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "spring-4",
    title: "Spring Brunch",
    imageUrl:
      "https://images.unsplash.com/photo-1583254130193-563e6cb1fe44?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "spring-5",
    title: "Garden Tea Party",
    imageUrl:
      "https://images.unsplash.com/photo-1685514473556-c983a5971d13?q=80&w=600&auto=format&fit=crop",
  },
];

const SUMMER_HIGHLIGHTS = [
  {
    id: "summer-1",
    title: "Alfresco Dining",
    imageUrl:
      "https://images.unsplash.com/photo-1610036615775-f5814e8bd4df?q=80&w=800&auto=format",
  },
  {
    id: "summer-2",
    title: "Corporate Retreats",
    imageUrl:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format",
  },
  {
    id: "summer-3",
    title: "Outdoor Concerts",
    imageUrl:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=800&auto=format",
  },
  {
    id: "summer-4",
    title: "Poolside Themes",
    imageUrl:
      "https://images.unsplash.com/photo-1722404190766-cd39c0742175?q=80&w=800&auto=format",
  },
];
export default function StorePage() {
  return (
    <div className="space-y-16 py-8">
      {/* Spring Section - Compact Grid */}
      <section>
        <div className="px-4 mb-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            The Spring Collection
          </h2>
          <p className="text-gray-500 mt-1">
            Curated ideas for fresh beginnings and outdoor gatherings.
          </p>
        </div>

        <CategoryGrid cols={5} categories={SPRING_COLLECTION} aspect="square" />
      </section>

      {/* Summer Section - Premium Overlay Grid */}
      <section className="bg-gray-100 py-12 rounded-xs">
        <div className="container mx-auto">
          <div className="px-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Summer Celebrations
            </h2>
            <p className="text-gray-500 mt-1">
              Make a statement with our most vibrant event themes.
            </p>
          </div>

          <CategoryGrid
            cols={4}
            layout="overlay"
            aspect="portrait"
            categories={SUMMER_HIGHLIGHTS}
            className="px-4"
          />
        </div>
      </section>
    </div>
  );
}
