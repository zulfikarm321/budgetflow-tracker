import Dashboard from "../components/Dashboard";

import CalendarView from "../components/CalendarView";

import QuickWithdrawModal from "../components/QuickWithdrawModal";

import useBudgetStore from "../store/budgetStore";
import SettingsModal from "../components/SettingsModal";
import SetupModal from "../components/modal/SetupModal";
import TopUpModal from "../components/modal/TopUpModal";
import HistoryModal from "../components/history/HistoryModal";

import { Wallet2, Settings, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import SummaryCardList from "../components/dashboard/SummaryCardList";
import AnalyticsCard from "../components/dashboard/AnalyticsCard";
import ButtonSection from "../components/dashboard/ButtonSection";

export default function Home() {
  const { setQuickModal, setSettingsModal, setTopUpModal } = useBudgetStore();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* STICKY HEADER */}

      <Header />

      {/* CONTENT */}

      <motion.main
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.45,
        }}
        className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
      >
        <SummaryCardList />

        <ButtonSection />

        <AnalyticsCard />

        <CalendarView />
      </motion.main>
      <TopUpModal />
      <SetupModal />
      <QuickWithdrawModal />
      <SettingsModal />
      <HistoryModal />
    </div>
  );
}
