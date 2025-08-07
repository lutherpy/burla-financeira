// app/api/export/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/_auth"; // ajuste para o seu auth real
import { db } from "@/db/drizzle";
import { userDetails } from "@/db/schema";
import { eq } from "drizzle-orm";
import ExcelJS from "exceljs";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db
      .select()
      .from(userDetails)
      .where(eq(userDetails.userId, userId));

    // Criar o workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("User Details");

    if (result.length === 0) {
      worksheet.addRow(["Sem dados disponíveis"]);
    } else {
      worksheet.columns = Object.keys(result[0]).map((key) => ({
        header: key,
        key,
      }));
      result.forEach((row) => worksheet.addRow(row));
    }

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=user-details.xlsx",
      },
    });
  } catch (error) {
    console.error("Erro ao exportar dados:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
