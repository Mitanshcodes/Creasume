import "dotenv/config";
import { PrismaClient, Platform } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding demo creator...");

  await db.user.upsert({
    where: { email: "demo@creasume.com" },
    update: {},
    create: {
      email: "demo@creasume.com",
      name: "Alex Rivera",
      creator: {
        create: {
          username: "demo",
          displayName: "Alex Rivera",
          headline: "Travel & lifestyle creator based in NYC",
          bio: "I explore the world one adventure at a time. Partnered with 30+ global brands to tell authentic stories through travel, food, and culture.",
          location: "New York City, NY",
          niches: ["travel", "lifestyle", "food", "photography"],
          contactEmail: "alex@creasume.com",
          websiteUrl: "https://alexrivera.com",
          isPublished: true,
          analyticsSnapshots: {
            create: [
              {
                platform: Platform.INSTAGRAM,
                followers: 284000,
                engagementRate: 0.048,
                avgLikes: 9800,
                avgComments: 340,
                totalPosts: 412,
                audienceJson: {
                  genderSplit: { female: 0.62, male: 0.38 },
                  ageBuckets: [
                    { range: "18-24", pct: 0.28 },
                    { range: "25-34", pct: 0.41 },
                    { range: "35-44", pct: 0.19 },
                    { range: "45+", pct: 0.12 },
                  ],
                  topCountries: [
                    { name: "United States", pct: 0.54 },
                    { name: "United Kingdom", pct: 0.09 },
                    { name: "Canada", pct: 0.07 },
                    { name: "Australia", pct: 0.06 },
                  ],
                  topCities: ["New York", "Los Angeles", "London", "Toronto", "Sydney"],
                },
                topContentJson: [
                  {
                    url: "https://instagram.com/p/demo1",
                    thumbnail: "https://picsum.photos/seed/ig1/400/400",
                    likes: 32100,
                    comments: 890,
                    caption: "Sunrise over the Sahara 🌅 #travel #adventure",
                  },
                  {
                    url: "https://instagram.com/p/demo2",
                    thumbnail: "https://picsum.photos/seed/ig2/400/400",
                    likes: 28400,
                    comments: 612,
                    caption: "Tokyo ramen at 2am hits different 🍜 #tokyo #food",
                  },
                  {
                    url: "https://instagram.com/p/demo3",
                    thumbnail: "https://picsum.photos/seed/ig3/400/400",
                    likes: 24900,
                    comments: 490,
                    caption: "Amalfi Coast vibes forever 💙 #italy #amalfi",
                  },
                ],
              },
              {
                platform: Platform.YOUTUBE,
                followers: 142000,
                engagementRate: 0.065,
                avgViews: 48000,
                avgLikes: 3100,
                avgComments: 280,
                totalPosts: 87,
                audienceJson: {
                  genderSplit: { female: 0.55, male: 0.45 },
                  ageBuckets: [
                    { range: "18-24", pct: 0.31 },
                    { range: "25-34", pct: 0.38 },
                    { range: "35-44", pct: 0.21 },
                    { range: "45+", pct: 0.10 },
                  ],
                  topCountries: [
                    { name: "United States", pct: 0.58 },
                    { name: "United Kingdom", pct: 0.08 },
                    { name: "India", pct: 0.07 },
                    { name: "Canada", pct: 0.06 },
                  ],
                  topCities: ["New York", "London", "Mumbai", "Toronto", "Los Angeles"],
                },
                topContentJson: [
                  {
                    url: "https://youtube.com/watch?v=demo1",
                    thumbnail: "https://picsum.photos/seed/yt1/480/270",
                    views: 182000,
                    likes: 8900,
                    comments: 740,
                    caption: "I Lived in Tokyo for 30 Days — Here's What Happened",
                  },
                  {
                    url: "https://youtube.com/watch?v=demo2",
                    thumbnail: "https://picsum.photos/seed/yt2/480/270",
                    views: 134000,
                    likes: 6200,
                    comments: 510,
                    caption: "Budget Europe Trip: $50/Day Challenge",
                  },
                ],
              },
            ],
          },
          campaigns: {
            create: [
              {
                brandName: "Away",
                title: "Summer Travel Collection",
                description:
                  "Showcased Away's new Bigger Carry-On across 4 destinations in 3 weeks. Produced 3 Reels + 8 Stories.",
                platform: Platform.INSTAGRAM,
                isFeatured: true,
                order: 0,
                metricsJson: {
                  reach: 520000,
                  impressions: 780000,
                  likes: 41200,
                  comments: 1840,
                },
                startedAt: new Date("2024-06-01"),
                endedAt: new Date("2024-06-30"),
              },
              {
                brandName: "Airalo",
                title: "Global eSIM Partnership",
                description:
                  "Long-term partnership promoting affordable data plans for international travelers. YouTube integration video + IG carousel.",
                platform: Platform.YOUTUBE,
                isFeatured: true,
                order: 1,
                metricsJson: {
                  reach: 210000,
                  impressions: 390000,
                  views: 148000,
                  clicks: 12400,
                },
                startedAt: new Date("2024-03-15"),
                endedAt: new Date("2024-04-15"),
              },
            ],
          },
          packages: {
            create: [
              {
                name: "Instagram Reel",
                description: "One cinematic travel reel with professional editing, voiceover, and location tags.",
                priceCents: 250000,
                currency: "USD",
                deliverables: [
                  "1 x 30-60 second Reel",
                  "3 x Stories with swipe-up",
                  "Full usage rights (30 days)",
                  "Performance report after 7 days",
                ],
                order: 0,
              },
              {
                name: "YouTube Integration",
                description: "60-90 second mid-roll integration in an upcoming travel video (100k+ average views).",
                priceCents: 500000,
                currency: "USD",
                deliverables: [
                  "60-90s mid-roll integration",
                  "Product mention in title/description",
                  "Pinned comment with affiliate link",
                  "Full usage rights (90 days)",
                ],
                order: 1,
              },
            ],
          },
        },
      },
    },
    include: { creator: true },
  });

  console.log("✅ Demo creator seeded at /demo");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
