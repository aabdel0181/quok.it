import { motion } from "framer-motion";
import {
  HiOutlineTrophy,
  HiOutlineChartBar,
  HiOutlineClock,
} from "react-icons/hi2";

interface LeaderStats {
  gpuCount: number;
  uptime: string;
  efficiency: string;
}

interface LeaderData {
  rank: number;
  name: string;
  stats: LeaderStats;
}

const leaderboardData: LeaderData[] = [
  {
    rank: 1,
    name: "Hyperbolic",
    stats: {
      gpuCount: 1250,
      uptime: "99.99%",
      efficiency: "98.5%",
    },
  },
  {
    rank: 2,
    name: "Nebula Computing",
    stats: {
      gpuCount: 850,
      uptime: "99.95%",
      efficiency: "97.8%",
    },
  },
  // Add more dummy data for ranks 3-5
];

export const LeaderboardPanel = () => {
  const [firstPlace, ...runners] = leaderboardData;

  return (
    <div className="space-y-8">
      {/* Featured First Place Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[var(--surface)] to-[var(--surface-dark)] 
                   rounded-2xl p-6 shadow-lg border border-[var(--border-light)]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-full bg-[var(--primary)] bg-opacity-10 
                            flex items-center justify-center"
              >
                <HiOutlineTrophy className="w-8 h-8 text-[var(--primary)]" />
              </div>
              <div
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full 
                            bg-[var(--primary)] text-white flex items-center 
                            justify-center text-sm font-bold"
              >
                1
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[var(--foreground)]">
                {firstPlace.name}
              </h3>
              <p className="text-[var(--text-secondary)]">Network Leader</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <StatCard
              icon={<HiOutlineChartBar />}
              value={firstPlace.stats.gpuCount.toString()}
              label="GPUs"
            />
            <StatCard
              icon={<HiOutlineClock />}
              value={firstPlace.stats.uptime}
              label="Uptime"
            />
            <StatCard
              icon={<HiOutlineChartBar />}
              value={firstPlace.stats.efficiency}
              label="Efficiency"
            />
          </div>
        </div>
      </motion.div>

      {/* Runners Up Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[var(--surface)] rounded-xl shadow-md overflow-hidden"
      >
        <table className="w-full">
          <thead className="bg-[var(--surface-dark)]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--foreground)]">
                Rank
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--foreground)]">
                Network
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-[var(--foreground)]">
                GPUs
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-[var(--foreground)]">
                Uptime
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-[var(--foreground)]">
                Efficiency
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-light)]">
            {runners.map((runner) => (
              <tr
                key={runner.rank}
                className="hover:bg-[var(--surface-dark)] transition-colors"
              >
                <td className="px-6 py-4 text-[var(--text-secondary)]">
                  #{runner.rank}
                </td>
                <td className="px-6 py-4 font-medium text-[var(--foreground)]">
                  {runner.name}
                </td>
                <td className="px-6 py-4 text-right text-[var(--text-secondary)]">
                  {runner.stats.gpuCount}
                </td>
                <td className="px-6 py-4 text-right text-[var(--text-secondary)]">
                  {runner.stats.uptime}
                </td>
                <td className="px-6 py-4 text-right text-[var(--text-secondary)]">
                  {runner.stats.efficiency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => (
  <div className="bg-[var(--background)] rounded-lg p-4 text-center">
    <div className="text-[var(--primary)] mb-2">{icon}</div>
    <div className="text-xl font-bold text-[var(--foreground)]">{value}</div>
    <div className="text-sm text-[var(--text-secondary)]">{label}</div>
  </div>
);
