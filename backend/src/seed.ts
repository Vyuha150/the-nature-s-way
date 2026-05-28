import mongoose from "mongoose";
import { connectDb } from "./config/db";
import { env } from "./config/env";
import { hashPassword } from "./utils/password";
import { User } from "./models/User";
import { Product } from "./models/Product";
import { Order } from "./models/Order";
import { Page } from "./models/Page";
import { Section } from "./models/Section";

async function seed() {
  await connectDb();

  await Promise.all([
    Order.deleteMany({}),
    Section.deleteMany({}),
    Page.deleteMany({}),
    Product.deleteMany({}),
    User.deleteMany({}),
  ]);

  const adminPasswordHash = await hashPassword(env.ADMIN_BOOTSTRAP_PASSWORD);

  const [admin] = await User.create([
    {
      name: "Nature's Way Admin",
      email: env.ADMIN_BOOTSTRAP_EMAIL,
      passwordHash: adminPasswordHash,
      role: "admin",
      tier: "VIP",
    },
  ]);

  const customerPasswordHash = await hashPassword("Customer123!");
  const customers = await User.create([
    { name: "Aarav Mehta", email: "aarav@example.com", passwordHash: customerPasswordHash, role: "customer", tier: "VIP" },
    { name: "Priya Shah", email: "priya@example.com", passwordHash: customerPasswordHash, role: "customer", tier: "VIP" },
    { name: "Liam Carter", email: "liam@example.com", passwordHash: customerPasswordHash, role: "customer", tier: "Returning" },
    { name: "Noor Hassan", email: "noor@example.com", passwordHash: customerPasswordHash, role: "customer", tier: "Returning" },
    { name: "Sofia Rossi", email: "sofia@example.com", passwordHash: customerPasswordHash, role: "customer", tier: "Returning" },
    { name: "Kenji Watanabe", email: "kenji@example.com", passwordHash: customerPasswordHash, role: "customer", tier: "New" },
  ]);

  const products = await Product.create([
    {
      name: "Cold-Pressed Turmeric",
      category: "Spices",
      price: 18,
      stock: 124,
      status: "Active",
      description: "Single-origin turmeric, cold pressed for stronger color and aroma.",
    },
    {
      name: "Stone-Ground Moringa",
      category: "Herbs",
      price: 22,
      stock: 98,
      status: "Active",
      description: "Bright moringa powder with a clean, earthy finish.",
    },
    {
      name: "Sun-Dried Dates",
      category: "Sweeteners",
      price: 14,
      stock: 56,
      status: "Active",
      description: "Naturally dried dates with no added sugar.",
    },
    {
      name: "Heritage Whole Flour",
      category: "Grains",
      price: 12,
      stock: 210,
      status: "Active",
      description: "Whole grain flour milled from heritage wheat.",
    },
    {
      name: "Raw Pumpkin Seeds",
      category: "Seeds",
      price: 16,
      stock: 142,
      status: "Active",
      description: "Unroasted pumpkin seeds, high in crunch and minerals.",
    },
    {
      name: "Wild Forest Honey",
      category: "Sweeteners",
      price: 28,
      stock: 0,
      status: "Draft",
      description: "Reserve batch from a seasonal forest harvest.",
    },
  ]);

  await Page.create([
    { slug: "home", title: "Home", route: "/", status: "Published" },
    { slug: "philosophy", title: "Philosophy", route: "/philosophy", status: "Published" },
    { slug: "promise", title: "Promise", route: "/promise", status: "Published" },
    { slug: "range", title: "Range", route: "/range", status: "Published" },
    { slug: "trace", title: "Trace", route: "/trace", status: "Published" },
    { slug: "contact", title: "Contact", route: "/contact", status: "Published" },
  ]);

  await Section.create([
    {
      pageSlug: "home",
      pageTitle: "Home",
      key: "hero",
      heading: "Nothing Hidden",
      body: "Whole foods. Honest origins. Crafted by The Nature's Way.",
    },
    {
      pageSlug: "home",
      pageTitle: "Home",
      key: "philosophy",
      heading: "Our Philosophy",
      body: "Every bite tells story of soil, sun, and skilled hands.",
    },
    {
      pageSlug: "philosophy",
      pageTitle: "Philosophy",
      key: "intro",
      heading: "Rooted in Truth",
      body: "We believe food should be traceable from seed to spoon.",
    },
    {
      pageSlug: "promise",
      pageTitle: "Promise",
      key: "intro",
      heading: "Our Promise",
      body: "No shortcuts. No fillers. No secrets.",
    },
    {
      pageSlug: "contact",
      pageTitle: "Contact",
      key: "cta",
      heading: "Get in Touch",
      body: "We'd love to hear your story.",
    },
  ]);

  const orderSeed = [
    { customer: customers[0], items: [{ product: products[0], quantity: 2 }, { product: products[4], quantity: 1 }], status: "Paid", source: "Organic" },
    { customer: customers[1], items: [{ product: products[1], quantity: 1 }, { product: products[2], quantity: 2 }], status: "Shipped", source: "Direct" },
    { customer: customers[2], items: [{ product: products[3], quantity: 3 }], status: "Pending", source: "Email" },
    { customer: customers[3], items: [{ product: products[0], quantity: 1 }], status: "Paid", source: "Referral" },
    { customer: customers[4], items: [{ product: products[4], quantity: 2 }, { product: products[2], quantity: 1 }], status: "Refunded", source: "Social" },
    { customer: customers[5], items: [{ product: products[1], quantity: 1 }], status: "Delivered", source: "Direct" },
  ] as const;

  await Order.create(
    orderSeed.map((entry, index) => {
      const items = entry.items.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        category: item.product.category,
        price: item.product.price,
        quantity: item.quantity,
        lineTotal: item.product.price * item.quantity,
      }));

      return {
        orderNumber: `#1028${4 - index}`,
        customer: entry.customer._id,
        customerName: entry.customer.name,
        customerEmail: entry.customer.email,
        items,
        status: entry.status,
        total: items.reduce((sum, item) => sum + item.lineTotal, 0),
        source: entry.source,
        createdAt: new Date(Date.UTC(2026, 4, 13 - index)),
        updatedAt: new Date(Date.UTC(2026, 4, 13 - index)),
      };
    }),
  );

  // eslint-disable-next-line no-console
  console.log(`Seeded admin ${admin.email}, ${customers.length} customers, ${products.length} products, 6 orders.`);
}

seed()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Seed failed", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
