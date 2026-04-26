import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { EcommerceOrder } from "@/types";
import { formatPaymentMethodLabel } from "@/components/orders/orderUi";

const BRAND_NAME = "Hawkeri";
const BRAND_TAGLINE = "Multi-vendor marketplace";
const BRAND_EMAIL = "support@hawkeri.com";
const BRAND_PHONE = "01577-303608";
const BRAND_ADDRESS = "Dhaka, Bangladesh 24/7 Support";

const COLOR_BLACK: [number, number, number] = [18, 18, 18];
const COLOR_DARK: [number, number, number] = [36, 36, 36];
const COLOR_MUTED: [number, number, number] = [104, 104, 104];
const COLOR_BORDER: [number, number, number] = [210, 210, 210];

const PAGE_MARGIN = 14;
const CURRENCY_PREFIX = "Tk ";

function formatMoney(value: number | string) {
  const numeric = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(numeric)) {
    return `${CURRENCY_PREFIX}0.00`;
  }
  return `${CURRENCY_PREFIX}${numeric.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function drawBadge(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(COLOR_BLACK[0], COLOR_BLACK[1], COLOR_BLACK[2]);
  doc.text(text, x, y);
}

function drawSectionTitle(doc: jsPDF, label: string, x: number, y: number) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  doc.text(label.toUpperCase(), x, y, { charSpace: 0.6 });
}

function drawAddressBlock(
  doc: jsPDF,
  title: string,
  lines: string[],
  x: number,
  y: number,
  width: number,
) {
  const padding = 5;
  const titleHeight = 6;
  const lineHeight = 5;
  const height = padding * 2 + titleHeight + lines.length * lineHeight;

  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.roundedRect(x, y, width, height, 2, 2, "S");

  drawSectionTitle(doc, title, x + padding, y + padding + 2.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(COLOR_DARK[0], COLOR_DARK[1], COLOR_DARK[2]);

  lines.forEach((line, index) => {
    if (index === 0) {
      doc.setFont("helvetica", "bold");
    } else {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    }
    doc.text(line, x + padding, y + padding + titleHeight + lineHeight * (index + 1) - 1);
  });

  return height;
}

function getVariantText(variantData: Record<string, string> | null) {
  if (!variantData) return "";
  return Object.entries(variantData)
    .map(([k, v]) => `${k}: ${v}`)
    .join(" / ");
}

export function generateInvoicePdf(order: EcommerceOrder) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - PAGE_MARGIN * 2;
  const footerTop = pageHeight - 24;
  const footerY = pageHeight - 14;

  function drawPageBackground() {
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
  }

  function drawFooter(page: number, totalPages: number) {
    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    doc.setLineWidth(0.2);
    doc.line(PAGE_MARGIN, footerTop, pageWidth - PAGE_MARGIN, footerTop);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(COLOR_BLACK[0], COLOR_BLACK[1], COLOR_BLACK[2]);
    doc.text("Thank you for shopping with us!", PAGE_MARGIN, footerY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text(
      "This invoice is computer generated and does not require a signature.",
      PAGE_MARGIN,
      footerY + 5,
    );

    const pageLabel = `Page ${page} of ${totalPages}`;
    const pageLabelWidth = doc.getTextWidth(pageLabel);
    doc.text(pageLabel, pageWidth - PAGE_MARGIN - pageLabelWidth, footerY + 5);
  }

  drawPageBackground();

  // ==== Header ====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(COLOR_BLACK[0], COLOR_BLACK[1], COLOR_BLACK[2]);
  doc.text(BRAND_NAME, PAGE_MARGIN, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  doc.text(BRAND_TAGLINE, PAGE_MARGIN, 22);
  doc.text(`${BRAND_EMAIL}  |  ${BRAND_PHONE}`, PAGE_MARGIN, 27);
  doc.text(BRAND_ADDRESS, PAGE_MARGIN, 32);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(COLOR_BLACK[0], COLOR_BLACK[1], COLOR_BLACK[2]);
  const invoiceLabel = "INVOICE";
  const invoiceLabelWidth = doc.getTextWidth(invoiceLabel);
  doc.text(invoiceLabel, pageWidth - PAGE_MARGIN - invoiceLabelWidth, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  const orderNumberLabel = `# ${order.order_number}`;
  const orderNumberWidth = doc.getTextWidth(orderNumberLabel);
  doc.text(orderNumberLabel, pageWidth - PAGE_MARGIN - orderNumberWidth, 23);

  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.line(PAGE_MARGIN, 38, pageWidth - PAGE_MARGIN, 38);

  // ==== Meta strip ====
  const metaTop = 46;
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.roundedRect(PAGE_MARGIN, metaTop, contentWidth, 22, 2, 2, "S");

  const metaCols = [
    { label: "Invoice No.", value: order.order_number },
    { label: "Issue Date", value: order.created_at || "—" },
    { label: "Payment Method", value: formatPaymentMethodLabel(order.payment_method) },
    { label: "Payment Status", value: "" },
  ];

  const colWidth = contentWidth / metaCols.length;
  metaCols.forEach((col, index) => {
    const colX = PAGE_MARGIN + colWidth * index + 5;
    drawSectionTitle(doc, col.label, colX, metaTop + 7);

    if (col.label === "Payment Status") {
      const statusText =
        order.payment_status === "paid"
          ? "Paid"
          : order.payment_status === "failed"
            ? "Failed"
            : "Pending";
      drawBadge(doc, statusText, colX, metaTop + 16);
    } else {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(COLOR_DARK[0], COLOR_DARK[1], COLOR_DARK[2]);
      doc.text(col.value, colX, metaTop + 16);
    }
  });

  // ==== Bill to / Ship to ====
  const addressTop = metaTop + 22 + 6;
  const addr = order.shipping_address;
  const cityLine = [addr.city, addr.postal_code].filter(Boolean).join(", ");
  const zoneLine = [addr.area, addr.zone].filter(Boolean).join(", ");

  const billLines = [addr.name, addr.phone, BRAND_ADDRESS].filter(Boolean) as string[];
  const shipLines = [addr.name, addr.address_line, zoneLine, cityLine, addr.phone].filter(
    Boolean,
  ) as string[];

  const halfWidth = (contentWidth - 6) / 2;
  const billHeight = drawAddressBlock(doc, "Bill To", billLines, PAGE_MARGIN, addressTop, halfWidth);
  drawAddressBlock(doc, "Ship To", shipLines, PAGE_MARGIN + halfWidth + 6, addressTop, halfWidth);

  // ==== Items table ====
  const tableTop = addressTop + billHeight + 8;

  const itemRows = order.items.map((item, index) => {
    const variant = getVariantText(item.variant_data);
    const description = variant
      ? `${item.product_name}\nSKU: ${item.sku}  |  ${variant}`
      : `${item.product_name}\nSKU: ${item.sku}`;

    return [
      String(index + 1),
      description,
      String(item.quantity),
      formatMoney(item.unit_price),
      formatMoney(item.subtotal),
    ];
  });

  autoTable(doc, {
    startY: tableTop,
    head: [["#", "Description", "Qty", "Unit Price", "Subtotal"]],
    body: itemRows,
    margin: { left: PAGE_MARGIN, right: PAGE_MARGIN, bottom: 30 },
    styles: {
      font: "helvetica",
      fontSize: 9.5,
      cellPadding: 3.5,
      textColor: COLOR_DARK,
      lineColor: COLOR_BORDER,
      lineWidth: 0.1,
      valign: "middle",
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: COLOR_BLACK,
      fontStyle: "bold",
      fontSize: 9.5,
      halign: "left",
    },
    bodyStyles: {
      fillColor: [255, 255, 255],
    },
    alternateRowStyles: {
      fillColor: [255, 255, 255],
    },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      1: { cellWidth: "auto" },
      2: { cellWidth: 16, halign: "center" },
      3: { cellWidth: 32, halign: "right" },
      4: { cellWidth: 32, halign: "right", fontStyle: "bold" },
    },
    didParseCell(data) {
      if (data.section === "body" && data.column.index === 1 && typeof data.cell.raw === "string") {
        const [productName, ...rest] = (data.cell.raw as string).split("\n");
        data.cell.text = [productName, ...rest];
        data.cell.styles.fontStyle = "normal";
      }
    },
  });

  // ==== Totals card ====
  const finalY =
    (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? tableTop;
  const totalsWidth = 78;
  const totalsX = pageWidth - PAGE_MARGIN - totalsWidth;
  const totalsHeight = 38;
  let totalsTop = finalY + 8;

  if (totalsTop + totalsHeight > footerY - 8) {
    doc.addPage();
    drawPageBackground();
    totalsTop = PAGE_MARGIN;
  }

  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.roundedRect(totalsX, totalsTop, totalsWidth, totalsHeight, 2, 2, "S");

  const totalRows: { label: string; value: string; emphasize?: boolean }[] = [
    { label: "Subtotal", value: formatMoney(order.subtotal) },
    { label: "Shipping", value: formatMoney(order.shipping_fee) },
    { label: "Grand Total", value: formatMoney(order.total), emphasize: true },
  ];

  const rowHeight = 8;
  totalRows.forEach((row, index) => {
    const rowY = totalsTop + 7 + index * rowHeight;

    if (row.emphasize) {
      doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
      doc.setLineWidth(0.2);
      doc.line(totalsX + 4, rowY - 4, totalsX + totalsWidth - 4, rowY - 4);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11.5);
      doc.setTextColor(COLOR_BLACK[0], COLOR_BLACK[1], COLOR_BLACK[2]);
    } else {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    }

    doc.text(row.label, totalsX + 5, rowY);

    if (row.emphasize) {
      doc.setTextColor(COLOR_BLACK[0], COLOR_BLACK[1], COLOR_BLACK[2]);
    } else {
      doc.setTextColor(COLOR_DARK[0], COLOR_DARK[1], COLOR_DARK[2]);
      doc.setFont("helvetica", "bold");
    }
    const valueWidth = doc.getTextWidth(row.value);
    doc.text(row.value, totalsX + totalsWidth - 5 - valueWidth, rowY);
  });

  // ==== Notes (left of totals) ====
  if (order.notes) {
    const notesWidth = pageWidth - PAGE_MARGIN * 2 - totalsWidth - 6;
    const notesX = PAGE_MARGIN;
    const notesTop = totalsTop;

    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    doc.roundedRect(notesX, notesTop, notesWidth, totalsHeight, 2, 2, "S");

    drawSectionTitle(doc, "Customer Note", notesX + 5, notesTop + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(COLOR_DARK[0], COLOR_DARK[1], COLOR_DARK[2]);
    const wrappedNote = doc.splitTextToSize(order.notes, notesWidth - 10);
    doc.text(wrappedNote, notesX + 5, notesTop + 14);
  }

  const totalPages = (doc as unknown as { getNumberOfPages: () => number }).getNumberOfPages();
  for (let page = 1; page <= totalPages; page += 1) {
    doc.setPage(page);
    drawFooter(page, totalPages);
  }

  doc.save(`${order.order_number}-invoice.pdf`);
}
