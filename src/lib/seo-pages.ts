export type SeoPage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  intro: string;
  banglaIntro: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  audience: string;
  highlights: string[];
  sections: Array<{ title: string; body: string; items?: string[] }>;
  faq: Array<{ question: string; answer: string }>;
};

const commonHighlights = [
  "Cash on delivery and digital payment friendly",
  "Local sellers and Bangladesh-focused shopping",
  "Fashion, beauty, electronics, grocery and daily essentials",
  "Vendor storefronts for SMEs and small businesses",
];

const commonFaq = [
  {
    question: "Why is Hawkeri relevant for Bangladesh ecommerce?",
    answer:
      "Hawkeri is focused on local shopping behavior in Bangladesh: marketplace browsing, local sellers, cash on delivery habits, digital payment readiness, order tracking and category-based product discovery.",
  },
  {
    question: "Is Hawkeri only for shoppers?",
    answer:
      "No. Hawkeri is useful for both shoppers and sellers. Customers can discover products, while local vendors and SMEs can use marketplace storefronts to sell online.",
  },
  {
    question: "What makes a Bangladesh marketplace page useful for SEO and AIEO?",
    answer:
      "Useful marketplace pages explain who the platform serves, what categories are available, how orders and payments work, why local sellers matter, and which buyer questions the page answers directly.",
  },
  {
    question: "Can Hawkeri help small businesses move online?",
    answer:
      "Yes. Hawkeri gives sellers a marketplace presence with product listings and store discovery, which can be easier than building a standalone ecommerce website first.",
  },
];

function buildAuthoritySections(page: {
  primaryKeyword: string;
  secondaryKeywords: string[];
  audience: string;
}): SeoPage["sections"] {
  return [
    {
      title: `What people mean when they search for ${page.primaryKeyword}`,
      body:
        `When shoppers or sellers search for ${page.primaryKeyword}, they are usually looking for a practical Bangladesh-ready solution, not just a generic website. They want to know whether the marketplace supports local sellers, clear product categories, flexible payment behavior, order tracking, delivery confidence and trustworthy product information. Hawkeri pages are structured to answer those commercial questions directly for both Google and AI answer engines.`,
      items: [
        "Clear explanation of the buyer or seller problem",
        "Bangladesh-specific payment and delivery context",
        "Internal links to product, category and vendor journeys",
        "FAQ answers written in direct question-and-answer format",
      ],
    },
    {
      title: "Bangladesh ecommerce context",
      body:
        "Online shopping in Bangladesh is shaped by trust, delivery coverage, seller reputation, price clarity, mobile-first browsing and cash-on-delivery expectations. A marketplace page needs to cover those details naturally so customers understand how the platform fits local buying habits. Hawkeri content focuses on local stores, product discovery, seller pages, order tracking and category-led shopping because those are the questions Bangladeshi buyers ask before placing an order.",
      items: [
        "COD and digital payment-friendly buying behavior",
        "Local seller and store discovery",
        "Fashion, electronics, beauty, grocery and daily essentials",
        "Order tracking, support and policy pages for trust",
      ],
    },
    {
      title: "How this page supports SEO and AIEO",
      body:
        `This page supports search engines and AI answer engines by covering the primary keyword, related terms such as ${page.secondaryKeywords.slice(0, 3).join(", ")}, and the real audience behind the search: ${page.audience} The goal is not keyword repetition; the goal is to make Hawkeri easy to understand as a Bangladesh-focused marketplace for shoppers and sellers.`,
    },
    {
      title: "Best next steps on Hawkeri",
      body:
        "Visitors who are ready to buy should browse products and categories. Sellers who want online reach should review the vendor path. Customers who need confidence before ordering should check order tracking, return policies, contact information and seller/product details. These internal paths help users move from search intent to action while also helping crawlers understand the site structure.",
      items: [
        "Browse products by category",
        "Explore seller stores and brands",
        "Review return policy and order tracking",
        "Become a vendor if you want to sell online",
      ],
    },
  ];
}

const makePage = (
  slug: string,
  title: string,
  primaryKeyword: string,
  h1: string,
  intro: string,
  audience: string,
  sections: SeoPage["sections"],
  faq: SeoPage["faq"],
  secondaryKeywords: string[] = [],
): SeoPage => {
  const pageContext = { primaryKeyword, secondaryKeywords, audience };

  return {
    slug,
    title,
    metaTitle: `${title} | Hawkeri Bangladesh`,
    metaDescription: `${intro} Shop from local sellers on Hawkeri with Bangladesh-ready categories, delivery, cash on delivery and digital payment options.`,
    h1,
    eyebrow: "Bangladesh Marketplace",
    intro,
    banglaIntro:
      "Hawkeri বাংলাদেশের ক্রেতা ও ছোট ব্যবসার জন্য একটি local online marketplace, যেখানে trusted seller, cash on delivery, digital payment, category shopping এবং vendor storefront একসাথে পাওয়া যায়।",
    primaryKeyword,
    secondaryKeywords,
    audience,
    highlights: commonHighlights,
    sections: [...sections, ...buildAuthoritySections(pageContext)],
    faq: [...faq, ...commonFaq],
  };
};

export const seoPages: SeoPage[] = [
  makePage(
    "online-shopping-bangladesh",
    "Online Shopping in Bangladesh",
    "online shopping in Bangladesh",
    "Online Shopping in Bangladesh from Local Sellers",
    "Hawkeri helps shoppers in Bangladesh discover products from local stores across fashion, beauty, electronics, grocery, accessories and daily essentials.",
    "Customers looking for trusted online shopping, COD, local sellers and category-based shopping in Bangladesh.",
    [
      {
        title: "Shop by category and local store",
        body: "Bangladeshi shoppers often search by product type, seller trust and delivery convenience. Hawkeri brings local stores, products and categories into one marketplace.",
        items: ["Fashion and lifestyle products", "Beauty and personal care", "Electronics and accessories", "Grocery and daily essentials"],
      },
      {
        title: "Built for Bangladesh buying habits",
        body: "Customers can browse products, compare sellers, use cash on delivery where available, and follow order workflows built for local ecommerce.",
      },
    ],
    [
      { question: "What is Hawkeri?", answer: "Hawkeri is an online marketplace for Bangladesh where shoppers can discover products from local sellers and stores." },
      { question: "Does Hawkeri support cash on delivery?", answer: "Hawkeri is designed for Bangladesh ecommerce workflows including cash on delivery and digital payment options where available." },
      { question: "Which products can I buy on Hawkeri?", answer: "Shoppers can browse fashion, beauty, electronics, accessories, grocery and other daily-use categories." },
    ],
    ["online shopping BD", "trusted online shopping Bangladesh", "local online marketplace Bangladesh"],
  ),
  makePage(
    "ecommerce-marketplace-bangladesh",
    "Ecommerce Marketplace Bangladesh",
    "ecommerce marketplace Bangladesh",
    "Ecommerce Marketplace in Bangladesh for Local Stores and Shoppers",
    "Hawkeri connects Bangladeshi customers with local sellers through a marketplace model built for product discovery, storefronts, orders and delivery-ready shopping.",
    "Shoppers, vendors, SMEs and retail stores using online marketplaces in Bangladesh.",
    [
      {
        title: "Marketplace for buyers and sellers",
        body: "A marketplace helps customers compare products while giving small sellers a digital storefront without building a full ecommerce site from scratch.",
      },
      {
        title: "Why Bangladesh SMEs need marketplace visibility",
        body: "Many small businesses sell through Facebook or offline counters. Hawkeri gives them a product catalog, store profile and marketplace discovery channel.",
        items: ["Store profile", "Product catalog", "Order flow", "Category discovery"],
      },
    ],
    [
      { question: "Is Hawkeri a marketplace?", answer: "Yes. Hawkeri is positioned as a local ecommerce marketplace connecting Bangladeshi sellers and customers." },
      { question: "Can small shops sell on Hawkeri?", answer: "Yes. Shops and SMEs can use Hawkeri vendor workflows to reach online customers." },
      { question: "How is a marketplace different from a single store?", answer: "A marketplace lists many sellers and product categories, while a single ecommerce store usually represents one seller." },
    ],
    ["marketplace Bangladesh", "online marketplace Bangladesh", "Bangladesh ecommerce platform"],
  ),
  makePage(
    "trusted-online-shopping-bangladesh",
    "Trusted Online Shopping Bangladesh",
    "trusted online shopping Bangladesh",
    "Trusted Online Shopping in Bangladesh with Local Seller Discovery",
    "Hawkeri focuses on practical trust signals for Bangladesh ecommerce: seller visibility, clear product pages, order tracking, customer support and local payment habits.",
    "Shoppers comparing online stores and marketplaces before buying in Bangladesh.",
    [
      {
        title: "Trust starts with clear seller and product information",
        body: "Customers need to know who sells the product, what they are buying, how payment works and how delivery will be handled.",
      },
      {
        title: "Useful trust signals for Bangladesh ecommerce",
        body: "Order tracking, support contact, return policy, seller pages and consistent product information help customers feel safer before checkout.",
      },
    ],
    [
      { question: "How can I shop online safely in Bangladesh?", answer: "Check seller information, product details, return policy, delivery terms, payment method and support contact before placing an order." },
      { question: "Does Hawkeri show local sellers?", answer: "Hawkeri includes store and seller browsing so customers can discover products from local businesses." },
      { question: "Why is order tracking important?", answer: "Order tracking gives customers visibility after purchase and reduces uncertainty during delivery." },
    ],
    ["safe online shopping Bangladesh", "reliable ecommerce Bangladesh", "trusted marketplace Bangladesh"],
  ),
  makePage(
    "cash-on-delivery-shopping-bangladesh",
    "Cash on Delivery Shopping Bangladesh",
    "cash on delivery Bangladesh",
    "Cash on Delivery Shopping in Bangladesh",
    "Hawkeri supports Bangladesh-friendly ecommerce journeys where shoppers can buy from local sellers with payment flexibility including cash on delivery where available.",
    "Customers who prefer COD and sellers serving Bangladesh ecommerce buyers.",
    [
      {
        title: "Why COD matters in Bangladesh",
        body: "Cash on delivery remains important because many shoppers want to inspect delivery flow, manage trust and avoid paying before dispatch.",
      },
      {
        title: "COD works best with clear order handling",
        body: "Sellers need accurate product information, customer confirmation, delivery tracking and return policies to make COD sustainable.",
      },
    ],
    [
      { question: "Does Hawkeri support cash on delivery?", answer: "Hawkeri is built around Bangladesh ecommerce workflows, including cash on delivery where sellers and delivery options support it." },
      { question: "Why do Bangladeshi shoppers prefer COD?", answer: "COD reduces buyer hesitation and fits common local shopping habits." },
      { question: "Can digital payments also be used?", answer: "Hawkeri is designed to support flexible payment journeys including digital payment options where available." },
    ],
    ["COD shopping Bangladesh", "cash delivery online shop Bangladesh", "online shopping cash on delivery"],
  ),
  makePage(
    "fashion-shopping-bangladesh",
    "Fashion Shopping Bangladesh",
    "fashion shopping Bangladesh",
    "Fashion Shopping in Bangladesh from Local Stores",
    "Hawkeri helps customers browse fashion products, clothing, lifestyle items and accessories from local sellers in Bangladesh.",
    "Customers searching for clothing, lifestyle, accessories and fashion deals online.",
    [
      {
        title: "Fashion discovery needs visuals and seller trust",
        body: "Fashion buyers compare style, price, seller, size, color and delivery confidence before ordering online.",
      },
      {
        title: "Local fashion sellers can grow online",
        body: "Hawkeri gives fashion shops a marketplace channel for product visibility beyond a physical store or social page.",
      },
    ],
    [
      { question: "Can I buy fashion products on Hawkeri?", answer: "Yes. Hawkeri includes fashion and lifestyle categories from local sellers." },
      { question: "Can fashion shops sell on Hawkeri?", answer: "Yes. Fashion sellers can use vendor storefronts and product listings to reach customers online." },
      { question: "What should I check before buying fashion online?", answer: "Check size, color, seller details, delivery terms and return policy." },
    ],
    ["clothing online shopping Bangladesh", "fashion marketplace Bangladesh", "online clothing store Bangladesh"],
  ),
  makePage(
    "electronics-shopping-bangladesh",
    "Electronics Shopping Bangladesh",
    "electronics online shopping Bangladesh",
    "Electronics Online Shopping in Bangladesh",
    "Hawkeri lets shoppers discover electronics, gadgets, accessories and daily tech products from local sellers in Bangladesh.",
    "Customers looking for gadgets, accessories, mobile items and electronics from local sellers.",
    [
      {
        title: "Electronics buyers need clear product details",
        body: "For gadgets and accessories, customers need price, stock, seller information, description, warranty notes where available and delivery clarity.",
      },
      {
        title: "Local electronics sellers can list products online",
        body: "Hawkeri helps electronics sellers create product visibility and receive orders from customers beyond their physical counter.",
      },
    ],
    [
      { question: "Can I buy electronics on Hawkeri?", answer: "Hawkeri supports electronics, gadgets and accessories categories from local sellers." },
      { question: "What should electronics product pages include?", answer: "Good electronics listings should include product name, price, images, description, seller and warranty or support information where applicable." },
      { question: "Can electronics shops sell online through Hawkeri?", answer: "Yes. Shops can use Hawkeri vendor workflows to list products and reach buyers." },
    ],
    ["gadgets online Bangladesh", "electronics marketplace Bangladesh", "mobile accessories online Bangladesh"],
  ),
  makePage(
    "beauty-products-online-bangladesh",
    "Beauty Products Online Bangladesh",
    "beauty products online Bangladesh",
    "Beauty Products Online in Bangladesh",
    "Hawkeri helps shoppers find beauty, skincare, personal care and lifestyle products from local sellers across Bangladesh.",
    "Beauty shoppers, skincare buyers and local beauty product sellers.",
    [
      {
        title: "Beauty shoppers compare trust and product detail",
        body: "Customers look for product type, price, seller trust, delivery terms and clear images before ordering beauty products online.",
      },
      {
        title: "Useful for small beauty sellers",
        body: "Beauty and personal care shops can use Hawkeri to list products and build discovery outside social media pages.",
      },
    ],
    [
      { question: "Can I shop beauty products on Hawkeri?", answer: "Yes. Hawkeri supports beauty, personal care and lifestyle product discovery." },
      { question: "Can beauty shops become vendors?", answer: "Yes. Beauty sellers can use vendor storefronts to list products online." },
      { question: "What should I check before buying beauty products?", answer: "Check seller details, product description, images, price, delivery and return policy." },
    ],
    ["skincare online Bangladesh", "beauty marketplace Bangladesh", "personal care online Bangladesh"],
  ),
  makePage(
    "grocery-shopping-online-bangladesh",
    "Grocery Shopping Online Bangladesh",
    "grocery shopping online Bangladesh",
    "Grocery Shopping Online in Bangladesh",
    "Hawkeri supports grocery and daily essentials discovery from local sellers for customers who want convenient online ordering in Bangladesh.",
    "Customers buying daily essentials and grocery sellers moving online.",
    [
      {
        title: "Daily essentials need fast discovery",
        body: "Grocery shoppers want clear categories, accurate availability, simple checkout and delivery confidence.",
      },
      {
        title: "Local grocery shops can use marketplace reach",
        body: "Hawkeri gives grocery and daily essentials sellers a way to list products and reach nearby or wider online customers.",
      },
    ],
    [
      { question: "Can I find grocery products on Hawkeri?", answer: "Hawkeri supports grocery and daily essentials categories when local sellers list those products." },
      { question: "Why sell grocery online?", answer: "Online grocery discovery helps shops reach repeat customers, busy families and buyers who prefer ordering from home." },
      { question: "What matters most for grocery ecommerce?", answer: "Availability, clear prices, delivery area, freshness and reliable fulfillment matter most." },
    ],
    ["online grocery Bangladesh", "daily essentials online Bangladesh", "grocery marketplace Bangladesh"],
  ),
  makePage(
    "sell-online-bangladesh",
    "Sell Online Bangladesh",
    "sell online in Bangladesh",
    "Sell Online in Bangladesh with a Marketplace Storefront",
    "Hawkeri helps Bangladeshi sellers move products online with marketplace visibility, store pages and customer order workflows.",
    "SMEs, retail shops, Facebook sellers and local vendors who want to sell online.",
    [
      {
        title: "Move beyond only Facebook posts",
        body: "Social selling works, but product catalogs, store pages and marketplace search make it easier for customers to browse and return.",
      },
      {
        title: "What sellers need to start",
        body: "A seller needs product names, prices, photos, stock availability, delivery plan and customer response process.",
        items: ["Product catalog", "Store profile", "Order management", "Delivery and payment process"],
      },
    ],
    [
      { question: "How can I sell online in Bangladesh?", answer: "You can start by listing products on a marketplace like Hawkeri, preparing clear product details and setting up delivery/payment workflows." },
      { question: "Is Hawkeri useful for Facebook sellers?", answer: "Yes. It can give social sellers a more structured product catalog and storefront." },
      { question: "Do I need my own ecommerce website?", answer: "Not always. A marketplace storefront can be a practical first step before building a standalone site." },
    ],
    ["online selling Bangladesh", "sell products online Bangladesh", "marketplace seller Bangladesh"],
  ),
  makePage(
    "become-vendor-bangladesh",
    "Become Vendor Bangladesh",
    "become vendor Bangladesh",
    "Become an Online Vendor in Bangladesh",
    "Hawkeri gives Bangladeshi shops and SMEs a vendor path to list products, build a local storefront and reach online shoppers.",
    "Local shops, small brands, wholesalers and digital sellers.",
    [
      {
        title: "Who should become a vendor",
        body: "Fashion shops, electronics sellers, beauty stores, grocery sellers, home product sellers and small brands can use marketplace visibility.",
      },
      {
        title: "Vendor readiness checklist",
        body: "Before joining, sellers should prepare product images, prices, stock, delivery coverage, return rules and customer support process.",
      },
    ],
    [
      { question: "Who can become a Hawkeri vendor?", answer: "Local shops, SMEs and product sellers in Bangladesh can explore Hawkeri vendor workflows." },
      { question: "What do I need before selling?", answer: "Prepare product photos, descriptions, prices, stock information, delivery plan and contact details." },
      { question: "Why use a marketplace?", answer: "A marketplace can provide product discovery, category browsing and buyer trust faster than starting alone." },
    ],
    ["online vendor Bangladesh", "become online seller Bangladesh", "vendor marketplace Bangladesh"],
  ),
  makePage(
    "hawkeri-vs-facebook-shop",
    "Hawkeri vs Facebook Shop",
    "Hawkeri vs Facebook shop",
    "Hawkeri vs Facebook Shop for Bangladesh Sellers",
    "Compare Hawkeri with Facebook-only selling for Bangladeshi SMEs that need product catalogs, store discovery, order flow and marketplace trust.",
    "Facebook sellers, local shop owners and SMEs considering marketplace selling.",
    [
      {
        title: "Facebook is good for reach, but weak for catalog structure",
        body: "Facebook posts can generate attention, but customers often struggle to browse old products, compare categories or track order flows.",
      },
      {
        title: "Marketplace pages improve product discovery",
        body: "Hawkeri gives products, stores and categories stable URLs that search engines and customers can revisit.",
      },
    ],
    [
      { question: "Is Hawkeri better than Facebook selling?", answer: "It depends. Facebook is useful for promotion, while Hawkeri is better for structured product catalogs, store pages and marketplace discovery." },
      { question: "Should sellers use both?", answer: "Yes. Sellers can use Facebook for traffic and Hawkeri for product listings and order-focused shopping." },
      { question: "Can marketplace pages rank on Google?", answer: "Yes, if pages have unique metadata, crawlable content, structured data and enough product/category depth." },
    ],
    ["Facebook shop alternative Bangladesh", "marketplace vs Facebook shop", "sell online without website Bangladesh"],
  ),
  makePage(
    "hawkeri-vs-traditional-ecommerce",
    "Hawkeri vs Traditional Ecommerce",
    "Hawkeri vs traditional ecommerce",
    "Hawkeri vs Traditional Ecommerce Website",
    "Compare Hawkeri marketplace selling with building a standalone ecommerce website for Bangladeshi SMEs.",
    "SMEs deciding between marketplace listing and a custom ecommerce website.",
    [
      {
        title: "Traditional ecommerce gives full control",
        body: "A standalone ecommerce site can be powerful, but it needs setup, traffic, maintenance, content, SEO, support and trust building.",
      },
      {
        title: "Marketplace selling can start faster",
        body: "A marketplace helps sellers start with existing category structure, store pages and buyer discovery instead of building every system alone.",
      },
    ],
    [
      { question: "Should I build my own ecommerce website?", answer: "A standalone site is useful for mature brands, but small sellers may start faster with a marketplace." },
      { question: "Can Hawkeri replace a website?", answer: "For many early sellers, a marketplace storefront can serve as the first online sales channel." },
      { question: "Which is better for SEO?", answer: "A marketplace can rank through category, product and seller pages, while a standalone site needs its own SEO authority." },
    ],
    ["ecommerce website vs marketplace Bangladesh", "marketplace selling Bangladesh", "online store alternative Bangladesh"],
  ),
];

export const seoPageSlugs = seoPages.map((page) => page.slug);

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}
