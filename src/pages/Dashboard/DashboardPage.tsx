

import {
  Users,
  Gauge,
  Clock,
  Siren,
  Zap,
  Bus,
  Trash2,
  Megaphone,
} from 'lucide-react';

import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import {
  StatisticCard,
  ChartCard,
  NotificationCard,
  FullPageSpinner,
} from '../../components/common';

import { AIRecommendationCard } from '../../components/dashboard/AIRecommendationCard';

import { useAsync } from '../../hooks/useAsync';

import { dashboardService } from '../../services/dashboardService';

import { recommendationService } from '../../services/recommendationService';


const chartTooltipStyle = {
  backgroundColor: '#0f1a3a',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  fontSize: '12px',
  color: '#fff',
};


export function DashboardPage() {

  // Load charts and announcements
  const {
    data,
    loading,
    error,
  } = useAsync(
    () => dashboardService.getDashboard(),
    []
  );


  // Load live MongoDB statistics
  const {
    data: liveStats,
    loading: statsLoading,
    error: statsError,
  } = useAsync(
    () => dashboardService.getDashboardStats(),
    []
  );


  // Load live recommendation
  const {
    data: liveRecommendation,
    loading: recommendationLoading,
    error: recommendationError,
  } = useAsync(
    () => recommendationService.getRecommendation(),
    []
  );


  if (loading) {
    return <FullPageSpinner />;
  }


  if (error || !data) {

    return (

      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">

        <p className="text-danger-400">

          Failed to load dashboard data.

        </p>

        <p className="text-sm text-navy-400">

          {error}

        </p>

      </div>

    );

  }


  // Existing dashboard data
  const {
    stats: existingStats,
    crowdTrend,
    queueTrend,
    energyTrend,
    transportTrend,
    announcements,
  } = data;


  // Prefer live MongoDB statistics
  const stats = liveStats ?? existingStats;


  return (

    <div className="space-y-6 animate-fade-in">


      {/* Page header */}

      <div className="flex items-center justify-between flex-wrap gap-4">

        <div>

          <h1 className="font-display font-bold text-white text-2xl lg:text-3xl">

            Operations Dashboard

          </h1>

          <p className="text-navy-400 mt-1">

            Real-time stadium overview & AI insights

          </p>

        </div>


        <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass">

          <span className="h-2 w-2 rounded-full bg-success-400 animate-pulse" />

          <span className="text-sm text-navy-200">

            Live · Emirates Stadium

          </span>

        </div>

      </div>


      {/* Live statistics loading */}

      {statsLoading && (

        <div className="glass-card p-4">

          <p className="text-sm text-navy-400">

            Loading live stadium statistics...

          </p>

        </div>

      )}


      {/* Live statistics error */}

      {statsError && (

        <div className="glass-card p-4">

          <p className="text-sm text-warning-400">

            Live statistics are unavailable.
            Displaying existing dashboard values.

          </p>

        </div>

      )}


      {/* Statistic cards */}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">


        <StatisticCard

          title="Visitors"

          value={stats.visitors}

          trend={stats.visitorsTrend}

          icon={<Users size={22} />}

          color="primary"

        />


        <StatisticCard

          title="Crowd Density"

          value={stats.crowdDensity}

          format="percent"

          trend={stats.crowdDensityTrend}

          icon={<Gauge size={22} />}

          color="warning"

        />


        <StatisticCard

          title="Avg Queue Time"

          value={stats.averageQueueTime}

          unit="min"

          trend={stats.averageQueueTimeTrend}

          icon={<Clock size={22} />}

          color="success"

        />


        <StatisticCard

          title="Emergency Alerts"

          value={stats.emergencyAlerts}

          icon={<Siren size={22} />}

          color="danger"

        />


        <StatisticCard

          title="Energy Usage"

          value={stats.energyUsage}

          unit="kW"

          trend={stats.energyUsageTrend}

          icon={<Zap size={22} />}

          color="warning"

        />


        <StatisticCard

          title="Transportation"

          value={stats.transportation}

          format="percent"

          trend={stats.transportationTrend}

          icon={<Bus size={22} />}

          color="primary"

        />


        <StatisticCard

          title="Waste Collection"

          value={stats.wasteCollection}

          format="percent"

          trend={stats.wasteCollectionTrend}

          icon={<Trash2 size={22} />}

          color="success"

        />


        <StatisticCard

          title="Announcements"

          value={stats.announcements}

          icon={<Megaphone size={22} />}

          color="primary"

        />

      </div>


      {/* Live recommendation loading */}

      {recommendationLoading && (

        <div className="glass-card p-5">

          <p className="text-navy-400">

            Analyzing current stadium conditions...

          </p>

        </div>

      )}


      {/* Recommendation error */}

      {recommendationError && (

        <div className="glass-card p-5">

          <p className="text-danger-400">

            Unable to load the smart recommendation.

          </p>

        </div>

      )}


      {/* Live recommendation */}

      {liveRecommendation && (

        <AIRecommendationCard

          recommendation={liveRecommendation}

        />

      )}


      {/* Charts */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">


        {/* Crowd chart */}

        <ChartCard

          title="Crowd Density Trend"

          subtitle="Last 8 hours"

          icon={<Users size={18} />}

        >

          <ResponsiveContainer width="100%" height={240}>

            <AreaChart data={crowdTrend}>

              <defs>

                <linearGradient

                  id="crowdGrad"

                  x1="0"

                  y1="0"

                  x2="0"

                  y2="1"

                >

                  <stop

                    offset="0%"

                    stopColor="#2f7bff"

                    stopOpacity={0.4}

                  />

                  <stop

                    offset="100%"

                    stopColor="#2f7bff"

                    stopOpacity={0}

                  />

                </linearGradient>

              </defs>


              <CartesianGrid

                strokeDasharray="3 3"

                stroke="rgba(255,255,255,0.05)"

              />


              <XAxis

                dataKey="time"

                stroke="#64748b"

                fontSize={12}

                tickLine={false}

                axisLine={false}

              />


              <YAxis

                stroke="#64748b"

                fontSize={12}

                tickLine={false}

                axisLine={false}

              />


              <Tooltip

                contentStyle={chartTooltipStyle}

              />


              <Area

                type="monotone"

                dataKey="value"

                stroke="#2f7bff"

                strokeWidth={2}

                fill="url(#crowdGrad)"

              />

            </AreaChart>

          </ResponsiveContainer>

        </ChartCard>


        {/* Queue chart */}

        <ChartCard

          title="Queue Wait Times"

          subtitle="Average minutes"

          icon={<Clock size={18} />}

        >

          <ResponsiveContainer width="100%" height={240}>

            <LineChart data={queueTrend}>

              <CartesianGrid

                strokeDasharray="3 3"

                stroke="rgba(255,255,255,0.05)"

              />


              <XAxis

                dataKey="time"

                stroke="#64748b"

                fontSize={12}

                tickLine={false}

                axisLine={false}

              />


              <YAxis

                stroke="#64748b"

                fontSize={12}

                tickLine={false}

                axisLine={false}

              />


              <Tooltip

                contentStyle={chartTooltipStyle}

              />


              <Line

                type="monotone"

                dataKey="value"

                stroke="#f59e0b"

                strokeWidth={2.5}

                dot={{

                  fill: '#f59e0b',

                  r: 3,

                }}

              />

            </LineChart>

          </ResponsiveContainer>

        </ChartCard>


        {/* Energy chart */}

        <ChartCard

          title="Energy Consumption"

          subtitle="Kilowatts over time"

          icon={<Zap size={18} />}

        >

          <ResponsiveContainer width="100%" height={240}>

            <BarChart data={energyTrend}>

              <CartesianGrid

                strokeDasharray="3 3"

                stroke="rgba(255,255,255,0.05)"

              />


              <XAxis

                dataKey="time"

                stroke="#64748b"

                fontSize={12}

                tickLine={false}

                axisLine={false}

              />


              <YAxis

                stroke="#64748b"

                fontSize={12}

                tickLine={false}

                axisLine={false}

              />


              <Tooltip

                contentStyle={chartTooltipStyle}

                cursor={{

                  fill: 'rgba(47,123,255,0.05)',

                }}

              />


              <Bar

                dataKey="value"

                fill="#10b981"

                radius={[6, 6, 0, 0]}

              />

            </BarChart>

          </ResponsiveContainer>

        </ChartCard>


        {/* Transport chart */}

        <ChartCard

          title="Transport Availability"

          subtitle="Percentage capacity"

          icon={<Bus size={18} />}

        >

          <ResponsiveContainer width="100%" height={240}>

            <AreaChart data={transportTrend}>

              <defs>

                <linearGradient

                  id="transGrad"

                  x1="0"

                  y1="0"

                  x2="0"

                  y2="1"

                >

                  <stop

                    offset="0%"

                    stopColor="#10b981"

                    stopOpacity={0.4}

                  />

                  <stop

                    offset="100%"

                    stopColor="#10b981"

                    stopOpacity={0}

                  />

                </linearGradient>

              </defs>


              <CartesianGrid

                strokeDasharray="3 3"

                stroke="rgba(255,255,255,0.05)"

              />


              <XAxis

                dataKey="time"

                stroke="#64748b"

                fontSize={12}

                tickLine={false}

                axisLine={false}

              />


              <YAxis

                stroke="#64748b"

                fontSize={12}

                tickLine={false}

                axisLine={false}

              />


              <Tooltip

                contentStyle={chartTooltipStyle}

              />


              <Area

                type="monotone"

                dataKey="value"

                stroke="#10b981"

                strokeWidth={2}

                fill="url(#transGrad)"

              />

            </AreaChart>

          </ResponsiveContainer>

        </ChartCard>

      </div>


      {/* Announcements */}

      <div>

        <div className="flex items-center gap-2 mb-4">

          <Megaphone

            size={20}

            className="text-primary-400"

          />

          <h2 className="font-display font-semibold text-white text-lg">

            Recent Announcements

          </h2>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {announcements.map((announcement) => (

            <NotificationCard

              key={announcement.id}

              notification={announcement}

            />

          ))}

        </div>

      </div>

    </div>

  );

}