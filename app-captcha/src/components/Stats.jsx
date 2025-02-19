import { useState, useEffect } from 'react';
import { 
  Paper, Typography, Box, Card, CardContent, Grid, 
  CircularProgress, IconButton, Tooltip, Select,
  MenuItem, FormControl, InputLabel, useTheme,
  Table, TableBody, TableCell, TableHead, TableRow
} from '@mui/material';
import { motion } from 'framer-motion';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import FilterListIcon from '@mui/icons-material/FilterList';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ScatterChart, Scatter, ZAxis, LineChart, Line, ComposedChart
} from 'recharts';
import axios from 'axios';
import { alpha } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import PieChartIcon from '@mui/icons-material/PieChart';

const COLORS = ['#2196f3', '#f50057', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4'];
const GRADIENTS = [
  ['#2196f3', '#1976d2'],
  ['#f50057', '#c51162'],
  ['#4caf50', '#388e3c'],
  ['#ff9800', '#f57c00']
];

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');
  const [groupBy, setGroupBy] = useState('day');

  const periodOptions = [
    { value: '7', label: '7 derniers jours' },
    { value: '30', label: '30 derniers jours' },
    { value: '90', label: '3 derniers mois' },
    { value: '365', label: 'Dernière année' },
  ];

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/api/stats?period=${period}&groupBy=${groupBy}`);
      setStats(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [period, groupBy]);

  const formatSuccessRate = (value) => {
    if (typeof value === 'number') {
      return value.toFixed(1);
    }
    return '0.0';
  };

  const theme = useTheme();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Card sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Box key={index} sx={{ color: entry.color, mb: 0.5 }}>
              <Typography variant="body2">
                {`${entry.name}: ${typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}`}
              </Typography>
            </Box>
          ))}
        </Card>
      );
    }
    return null;
  };

  const StatCard = ({ title, value, color, percentage }) => (
    <Card sx={{ 
      p: 3, 
      background: `linear-gradient(135deg, ${color}15, ${color}05)`,
      border: `1px solid ${color}30`,
      borderRadius: 2,
      height: '100%'
    }}>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ color: color, fontWeight: 'bold' }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </Typography>
      {percentage && (
        <Typography variant="body2" sx={{ color: color, mt: 1 }}>
          {percentage.toFixed(1)}% du total
        </Typography>
      )}
    </Card>
  );

  const FilterPanel = () => (
    <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 2, borderRadius: 2 }}>
      <FormControl size="small">
        <InputLabel>Période</InputLabel>
        <Select
          value={period}
          label="Période"
          onChange={(e) => setPeriod(e.target.value)}
        >
          <MenuItem value="7">7 jours</MenuItem>
          <MenuItem value="30">30 jours</MenuItem>
          <MenuItem value="90">3 mois</MenuItem>
          <MenuItem value="365">1 an</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel>Grouper par</InputLabel>
        <Select
          value={groupBy}
          label="Grouper par"
          onChange={(e) => setGroupBy(e.target.value)}
        >
          <MenuItem value="day">Jour</MenuItem>
          <MenuItem value="week">Semaine</MenuItem>
          <MenuItem value="month">Mois</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );

  // Fonction utilitaire pour convertir en nombre
  const toNumber = (value) => {
    if (typeof value === 'string') {
      return parseFloat(value);
    }
    return value || 0;
  };

  // Fonction pour calculer le taux de succès
  const getSuccessRate = (type) => {
    const successRate = toNumber(type.success_rate);
    return successRate;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: 3, maxWidth: 1600, margin: '0 auto' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 4 }}>
          Dashboard Statistiques
        </Typography>

        <FilterPanel />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Total Tentatives" 
              value={stats?.global?.total_attempts || 0}
              color={COLORS[0]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Succès" 
              value={toNumber(stats?.global?.total_success)}
              color={COLORS[2]}
              percentage={toNumber(stats?.global?.success_rate)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Échecs" 
              value={toNumber(stats?.global?.total_failed)}
              color={COLORS[1]}
              percentage={100 - toNumber(stats?.global?.success_rate)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Taux de Succès" 
              value={`${toNumber(stats?.global?.success_rate).toFixed(1)}%`}
              color={COLORS[3]}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TimelineIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Évolution Temporelle
                </Typography>
              </Box>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={stats?.timeStats}>
                  <defs>
                    {GRADIENTS.map((gradient, index) => (
                      <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={gradient[0]} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={gradient[1]} stopOpacity={0.2}/>
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.primary, 0.1)} />
                  <XAxis 
                    dataKey="date" 
                    stroke={theme.palette.text.secondary}
                    tickFormatter={(date) => new Date(date).toLocaleDateString()}
                  />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="success" 
                    name="Succès"
                    stroke={COLORS[2]} 
                    fill={`url(#gradient-2)`}
                    stackId="1"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="failed" 
                    name="Échecs"
                    stroke={COLORS[1]} 
                    fill={`url(#gradient-1)`}
                    stackId="1"
                  />
                  <Line
                    type="monotone"
                    dataKey="success_rate"
                    name="Taux de Succès"
                    stroke={COLORS[3]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PieChartIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Performance par Type
                </Typography>
              </Box>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={stats?.byType}>
                  <PolarGrid stroke={alpha(theme.palette.text.primary, 0.1)} />
                  <PolarAngleAxis dataKey="captcha_type" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Taux de Succès"
                    dataKey="success_rate"
                    stroke={COLORS[2]}
                    fill={COLORS[2]}
                    fillOpacity={0.6}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Distribution Horaire des Tentatives
                </Typography>
              </Box>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={stats?.hourlyStats || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.primary, 0.1)} />
                  <XAxis 
                    dataKey="hour" 
                    stroke={theme.palette.text.secondary}
                    tickFormatter={(hour) => `${hour}h`}
                  />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="success" 
                    name="Succès" 
                    fill={`url(#gradient-2)`}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="failed" 
                    name="Échecs" 
                    fill={`url(#gradient-1)`}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Distribution Horaire
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={stats?.hourlyStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis 
                    dataKey="hour" 
                    stroke={theme.palette.text.secondary}
                    tickFormatter={(hour) => `${hour}h`}
                  />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="success" 
                    name="Succès" 
                    stroke={COLORS[2]} 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="failed" 
                    name="Échecs" 
                    stroke={COLORS[1]} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Performance par Type de Captcha
              </Typography>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                {stats.byType.map((type, index) => {
                  const successRate = toNumber(type.success_rate);
                  const failureRate = 100 - successRate;
                  
                  return (
                    <Grid item xs={12} sm={6} md={4} key={type.captcha_type}>
                      <Card 
                        sx={{ 
                          p: 2,
                          background: `linear-gradient(135deg, ${COLORS[index % COLORS.length]}15, ${COLORS[index % COLORS.length]}05)`,
                          border: `1px solid ${COLORS[index % COLORS.length]}30`,
                          borderRadius: 2
                        }}
                      >
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                          {type.captcha_type}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="body2" color="textSecondary">
                            Total tentatives:
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {type.attempts}
                          </Typography>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="success.main">
                              Succès: {toNumber(type.success)}
                            </Typography>
                            <Typography variant="body2" color="success.main">
                              {successRate.toFixed(1)}%
                            </Typography>
                          </Box>
                          <Box sx={{ 
                            height: 4, 
                            bgcolor: 'success.main', 
                            width: `${successRate}%`,
                            borderRadius: 1
                          }} />
                        </Box>
                        <Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="error.main">
                              Échecs: {toNumber(type.failed)}
                            </Typography>
                            <Typography variant="body2" color="error.main">
                              {failureRate.toFixed(1)}%
                            </Typography>
                          </Box>
                          <Box sx={{ 
                            height: 4, 
                            bgcolor: 'error.main', 
                            width: `${failureRate}%`,
                            borderRadius: 1
                          }} />
                        </Box>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart 
                  data={stats.byType.map(type => ({
                    ...type,
                    success_rate: getSuccessRate(type)
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis 
                    dataKey="captcha_type" 
                    stroke={theme.palette.text.secondary}
                  />
                  <YAxis 
                    stroke={theme.palette.text.secondary}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`
                    }}
                    formatter={(value) => [`${Number(value).toFixed(1)}%`]}
                  />
                  <Legend />
                  <Bar 
                    dataKey="success_rate" 
                    name="Taux de Succès" 
                    fill={COLORS[2]}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default Stats;