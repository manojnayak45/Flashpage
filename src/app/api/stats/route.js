import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import QuickPage from "@/models/QuickPage";

export async function GET() {
  try {
    await connectToDatabase();

    // Total quick pages and published pages
    const totalQuickPages = await QuickPage.countDocuments();
    const activeQuickPages = await QuickPage.countDocuments({ status: "Published" });
    const totalDrafts = await QuickPage.countDocuments({ status: "Draft" });

    // Get companies created last month and this month
    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const lastMonthCompanies = await QuickPage.countDocuments({
      createdAt: { $gte: firstDayLastMonth, $lt: firstDayThisMonth },
    });

    const thisMonthCompanies = await QuickPage.countDocuments({
      createdAt: { $gte: firstDayThisMonth },
    });

    // Calculate growth %  
    const companyGrowth = lastMonthCompanies
      ? ((thisMonthCompanies - lastMonthCompanies) / lastMonthCompanies) * 100
      : 100;

    // Fetch most visited companies (Companies created multiple times)
    const topVisited = await QuickPage.aggregate([
      { $group: { _id: "$companyName", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    return NextResponse.json({
      success: true,
      totalQuickPages,
      activeQuickPages,
      totalPublished: activeQuickPages,
      totalDrafts,
      lastMonthCompanies,
      thisMonthCompanies,
      companyGrowth,
      avgSessionDuration: "4m 21sec", // Placeholder value (replace with real data)
      topVisited,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
