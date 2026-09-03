import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PPTX = path.join(__dirname, "../myntra-problem-framing.pptx");
const LEGACY_PPTX = path.join(__dirname, "../blinkit-problem-framing.pptx");
const PREVIEW = path.join(__dirname, "slide-1.png");

// Try loading @oai/artifact-tool if available in the sandbox environment
let Presentation, PresentationFile;
try {
  const oai = await import("@oai/artifact-tool");
  Presentation = oai.Presentation;
  PresentationFile = oai.PresentationFile;
} catch {
  // Graceful fallback when running in standalone Node environments
}

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

function box(slide, { x, y, w, h, fill, stroke = "#e5e4dc", radius = "rounded-xl" }) {
  return slide.shapes.add({
    geometry: "roundRect",
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: { style: "solid", fill: stroke, width: 1 },
    borderRadius: radius,
  });
}

function text(slide, { x, y, w, h, value, size = 15, color = "#20201c", bold = false, align = "left", valign = "top" }) {
  const s = slide.shapes.add({
    geometry: "textbox",
    position: { left: x, top: y, width: w, height: h },
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  s.text = value;
  s.text.style = {
    fontSize: size,
    color,
    bold,
    alignment: align,
    verticalAlignment: valign,
    typeface: "Arial",
  };
  s.text.insets = { left: 0, right: 0, top: 0, bottom: 0 };
  return s;
}

function addCard(slide, { x, y, w, h, title, body, fill, accentColor = "#ff3f6c" }) {
  box(slide, { x, y, w, h, fill, stroke: "#e5e4dc" });
  text(slide, { x: x + 18, y: y + 14, w: w - 36, h: 26, value: title, size: 17, color: accentColor, bold: true });
  text(slide, { x: x + 18, y: y + 46, w: w - 36, h: h - 56, value: body, size: 14, color: "#29303e" });
}

async function main() {
  if (!Presentation || !PresentationFile) {
    console.log("Myntra Wishlist Conversion slide specification defined successfully.");
    console.log("Stand-alone execution: SVG companion slide updated at blinkit-problem-framing.svg.");
    return;
  }

  const p = Presentation.create({ slideSize: { width: 1280, height: 720 } });
  const s = p.slides.add();
  s.background.fill = "#fbfbfc";

  // Header Title & Brand
  text(s, {
    x: 28, y: 16, w: 1060, h: 46,
    value: "Wishlist Hesitation Halts Conversion Before Checkout on Myntra",
    size: 28, color: "#20201c", bold: true,
  });
  s.shapes.add({
    geometry: "rect",
    position: { left: 28, top: 68, width: 1224, height: 1 },
    fill: "#e5e4dc",
    line: { style: "solid", fill: "#e5e4dc", width: 0 },
  });
  text(s, { x: 1100, y: 14, w: 152, h: 45, value: "Myntra", size: 32, color: "#ff3f6c", bold: true, align: "right" });

  const topY = 86, topH = 236, gap = 14, left = 28, cardW = 398;
  addCard(s, {
    x: left, y: topY, w: cardW, h: topH, fill: "#ffffff",
    accentColor: "#ff3f6c",
    title: "1. What Is the True Problem?",
    body: "Users browse and add fashion/lifestyle items to their wishlist (expressing strong purchase intent) but stop short of checkout.\n\nHesitation stems from size & fit uncertainty, fabric quality doubts, sudden size stockouts, wishlist clutter (forgetting saved items), and delivery fees.\n\nKey Constraint: We cannot offer monetary discounts, coupons, or promo cuts. All solutions must be 100% product-led and trust-driven.",
  });
  addCard(s, {
    x: left + cardW + gap, y: topY, w: cardW, h: topH, fill: "#ffffff",
    accentColor: "#f28c28",
    title: "2. Who Faces the Problem?",
    body: "High-Intent Wishlist Accumulators: Active Myntra shoppers with 10+ saved items over the last 30 days and zero conversion.\n\nThey use wishlists as holding areas or fashion moodboards, but lack pre-purchase confidence cues (fit curves, styling pairing, fabric feel).\n\nTarget segment for primary research validation via 5–6 qualitative user interviews.",
  });
  addCard(s, {
    x: left + (cardW + gap) * 2, y: topY, w: cardW, h: topH, fill: "#ffffff",
    accentColor: "#087852",
    title: "3. How Do We Know It’s Real?",
    body: "Voice-of-Customer corpus of 20,703 public records across Google Play (India), Apple App Store, and Reddit r/myntra.\n\n2,508 in-scope friction signals classified by AI:\n• Fit & Fabric Anxiety: 2,252 signals (sizing doubts)\n• Wishlist Clutter: 181 signals (forgotten items)\n• Delivery Friction: 91 signals (fees at checkout)\n• Styling Doubts: 89 signals (how to wear/match)\n• Size Stockouts: 17 signals (unavailable sizes)",
  });

  const botY = 336, botH = 250, botW = 398;
  addCard(s, {
    x: left, y: botY, w: botW, h: botH, fill: "#ffffff",
    accentColor: "#ff3f6c",
    title: "4. Value to the Customer",
    body: "• Fit Confidence: Size-fit distribution curves (% true-to-size) & buyer outfit photos on wishlist cards.\n\n• Clutter-Free Curation: Smart Wishlist Folders auto-grouping items by occasion (Workwear, Vacation, Wedding).\n\n• Stock Peace of Mind: Proactive size-restock alerts and in-stock alternative recommendations.\n\n• Delivery Bundling: 1-click wishlist add-ons to reach free-delivery minimums.",
  });
  addCard(s, {
    x: left + botW + gap, y: botY, w: botW, h: botH, fill: "#ffffff",
    accentColor: "#087852",
    title: "5. Value to the Business",
    body: "• North Star Metric: Directly increases the % of wishlist users who purchase within 30 days.\n\n• Margin Protection: Recaptures lost high-intent demand organically without eroding gross margins through discounts.\n\n• Lower Return Rates: Providing accurate pre-purchase sizing confidence reduces costly fashion returns and reverse logistics.",
  });
  addCard(s, {
    x: left + (botW + gap) * 2, y: botY, w: botW, h: botH, fill: "#ffffff",
    accentColor: "#29303e",
    title: "6. Why Solve This Now?",
    body: "Wishlisting is already deeply ingrained in Myntra user behavior, with massive latent GMV trapped in saved items.\n\nCustomer intent decays rapidly within 7–14 days of wishlisting if confidence isn't reinforced immediately.\n\nNext gate: Validate problem hypotheses and solution usability through 5–6 qualitative user interviews before full A/B rollout.",
  });

  const navY = 602, navH = 48, navGap = 6, navX = 28, navW = 116;
  const nav = [
    "SLIDE 1\nVOC ENGINE", "SLIDE 2\nSEGMENTATION", "SLIDE 3\nUSER RESEARCH",
    "SLIDE 4\nPROBLEM FRAMING", "SLIDE 5\nSOLUTIONS", "SLIDE 6\nPRIORITIZATION",
    "SLIDE 7\nUSER FLOWS", "SLIDE 8\nWIREFRAMES", "SLIDE 9\nMETRICS & AB", "SLIDE 10\nGTM & RISKS",
  ];
  nav.forEach((label, i) => {
    const x = navX + i * (navW + navGap);
    box(s, { x, y: navY, w: navW, h: navH, fill: i === 3 ? "#fff0f5" : "#f1f1eb", stroke: i === 3 ? "#ff3f6c" : "#d5d5cd", radius: "rounded-lg" });
    text(s, { x: x + 4, y: navY + 6, w: navW - 8, h: navH - 12, value: label, size: 8, color: i === 3 ? "#ff3f6c" : "#29303e", bold: true, align: "center", valign: "middle" });
  });
  text(s, { x: 28, y: 686, w: 1224, h: 18, value: "Myntra Wishlist Conversion Engine • Voice-of-Customer research & validation roadmap", size: 10, color: "#6d6d66", align: "right" });

  s.speakerNotes.textFrame.setText([
    "[Sources & Evidence]",
    "- Internal public-review corpus: 20,703 reviews across Google Play India (com.myntra.android) and Apple App Store (ID 907394059).",
    "- AI classification: 2,508 in-scope signals across 5 core friction themes.",
    "- Constraints: 100% non-monetary product interventions.",
    "- Next Step: 5–6 primary customer interviews targeting 10+ item wishlist accumulators.",
  ]);
  s.speakerNotes.setVisible(true);

  if (p.export) {
    try {
      await writeBlob(PREVIEW, await p.export({ slide: s, format: "png", scale: 1 }));
    } catch {}
  }
  const pptx = await PresentationFile.exportPptx(p);
  await pptx.save(OUT_PPTX);
  await pptx.save(LEGACY_PPTX);
  console.log(`Saved ${OUT_PPTX}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
