import { CategoryGrid } from "@/components/store/CategoryGrid";
import { Product, ProductGrid } from "../../components/store/ProductGrid";

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

const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "Minimalist Oak Dining Chair",
    description:
      "Solid oak wood with a natural oil finish and ergonomic backrest.",
    price: "$240.00",
    priceWithDiscount: "$189.99",
    rating: 9.2,
    reviewCount: 124,
    imageSrc:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=600",
    tags: [
      { label: "Sale", variant: "destructive" },
      { label: "Eco-Friendly", variant: "secondary" },
    ],
  },
  {
    id: "p2",
    title: "Ceramic Matte Vase",
    description: "Handcrafted stoneware with a textured matte finish.",
    price: "$45.00",
    rating: undefined, // Test Case: New product, no reviews yet
    reviewCount: undefined,
    imageSrc:
      "https://images.unsplash.com/photo-1631125915732-b98f8774f675?q=80&w=600",
    tags: [{ label: "New Arrival", variant: "default" }],
  },
  {
    id: "p3",
    title: "Velvet Tufted Ottoman",
    description: "Luxurious velvet upholstery with deep button tufting",
    price: "$120.00",
    priceWithDiscount: "$89.99",
    rating: 8.8,
    reviewCount: 42,
    imageSrc:
      "https://images.unsplash.com/photo-1568598617558-79e56547418f?q=80&w=600",
    tags: [{ label: "Limited Edition", variant: "secondary" }],
  },
  {
    id: "p4",
    title: "Brass Table Lamp",
    description: "Adjustable task lamp with a brushed brass finish.",
    price: "$115.00",
    rating: 4.5, // 0-10 scale (will show as 2.3/5)
    reviewCount: 8,
    imageSrc:
      "https://images.unsplash.com/photo-1773895314378-61929a946fcc?q=80&w=600",
    tags: [], // Test Case: No tags
  },
  {
    id: "p5",
    title: "Rattan Lounge Chair",
    description: "Handwoven rattan with a sturdy steel frame.",
    price: "$200.00",
    priceWithDiscount: "$159.99",
    rating: 7.5,
    reviewCount: 231,
    imageSrc:
      "https://images.unsplash.com/photo-1579146510179-6d8a87d24d54?q=80&w=600",
    tags: [
      { label: "Best Seller", variant: "default" },
      { label: "Eco-Friendly", variant: "secondary" },
      { label: "Sale", variant: "destructive" },
    ],
  },
  {
    id: "p6",
    title: "Hand-Blown Glass Pendant Light with Vintage Brass Hardware",
    description:
      "Elegant smoked glass shade that creates a warm, atmospheric glow in any room.",
    price: "$310.00",
    rating: 9.8,
    reviewCount: 56,
    imageSrc:
      "https://images.unsplash.com/photo-1677104170570-a351ef6ba836?q=80&w=600",
    tags: [{ label: "Premium", variant: "default" }],
  },
  {
    id: "p7",
    title: "Industrial Metal Bookshelf",
    description:
      "Five-tier shelving unit made from recycled iron and reclaimed wood.",
    price: "$450.00",
    priceWithDiscount: "$399.00",
    rating: 8.2,
    reviewCount: 15,
    imageSrc:
      "https://images.unsplash.com/photo-1688561117294-9aa6a511cc0a?q=80&w=600",
    tags: [
      { label: "Heavy Duty", variant: "outline" },
      { label: "Sale", variant: "destructive" },
    ],
  },
  {
    id: "p8",
    title: "Abstract Linen Throw Pillow",
    description: "Hand-painted abstract motifs on a 100% Belgian linen cover.",
    price: "$65.00",
    rating: 10.0,
    reviewCount: 3,
    imageSrc:
      "https://images.unsplash.com/photo-1636651430146-00b72284bfbb?q=80&w=600",
    tags: [{ label: "Trending", variant: "secondary" }],
  },
  {
    id: "p9",
    title: "Concrete Geometric Planter",
    description:
      "Modern minimalist planter with a raw concrete texture and drainage hole.",
    price: "$28.00",
    rating: undefined,
    reviewCount: 0,
    imageSrc:
      "https://images.unsplash.com/photo-1619965613398-e39e0dc9ed7b?q=80&w=600",
    tags: [{ label: "Small Batch", variant: "outline" }],
  },
  {
    id: "p10",
    title: "Art Deco Wall Mirror",
    description:
      "Large circular mirror with a sunburst frame in an antiqued gold finish.",
    price: "$185.00",
    priceWithDiscount: "$145.00",
    rating: 9.4,
    reviewCount: 89,
    imageSrc:
      "https://images.unsplash.com/photo-1675807526240-fb2e22e39048?q=80&w=600",
    tags: [
      { label: "Fragile", variant: "outline" },
      { label: "Sale", variant: "destructive" },
      { label: "Low Stock", variant: "secondary" },
    ],
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

      {/* Product Grid - Interactive */}
      <section>
        <div className="px-4 mb-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Featured Products
          </h2>
          <p className="text-gray-500 mt-1">
            Handpicked items to elevate your next event.
          </p>
        </div>

        {/* Interactive Product Grid */}
        <ProductGrid products={MOCK_PRODUCTS} cols={6} className="px-4" />
      </section>
    </div>
  );
}
