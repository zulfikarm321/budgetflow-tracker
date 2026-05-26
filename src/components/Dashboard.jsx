import MonthNavigation from "./dashboard/MonthNavigation";
import SummaryCardList from "./dashboard/SummaryCardList";
import AnalyticsCard from "./dashboard/AnalyticsCard";
import useBudgetStore from "../store/budgetStore";
import ButtonSection from "./dashboard/ButtonSection";

export default function Dashboard() {
  const { setQuickModal, resetMonth } = useBudgetStore();

  return (
    <>
      {/* MONTH NAV */}
      <MonthNavigation />

      {/* SUMMARY CARDS */}
      <SummaryCardList />

      {/* ANALYTICS */}
      <AnalyticsCard />

      {/* ACTIONS */}

      <ButtonSection />
    </>
  );
}
