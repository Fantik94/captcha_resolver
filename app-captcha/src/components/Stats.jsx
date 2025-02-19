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
  ScatterChart, Scatter, ZAxis, LineChart, Line, ComposedChart,
  Sector, LabelList
} from 'recharts';
import axios from 'axios';
import { alpha } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import PieChartIcon from '@mui/icons-material/PieChart';

const COLORS = {
  bruite: '#6366f1',    // Indigo élégant
  segmented: '#22c55e', // Vert vif
  line: '#f59e0b',      // Orange
  area: '#3b82f6',      // Bleu
  success: '#10b981',   // Vert émeraude
  failed: '#ef4444'     // Rouge
};

const GRADIENTS = [
  ['#2196f3', '#1976d2'],
  ['#f50057', '#c51162'],
  ['#4caf50', '#388e3c'],
  ['#ff9800', '#f57c00']
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, 
          fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      {/* Cercle central avec statistiques */}
      <circle cx={cx} cy={cy} r={innerRadius} fill="#fff" />
      <text x={cx} y={cy - 15} textAnchor="middle" fill="#333" fontSize={16} fontWeight="bold">
        {payload.captcha_type}
      </text>
      <text x={cx} y={cy + 15} textAnchor="middle" fill="#666" fontSize={14}>
        {`${(percent * 100).toFixed(1)}%`}
      </text>

      {/* Secteur principal */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        filter="url(#shadow)"
      />

      {/* Secteur externe (effet de surbrillance) */}
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
        filter="url(#glow)"
      />

      {/* Ligne et étiquettes */}
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} strokeWidth={2} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      
      {/* Texte détaillé */}
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" fontSize={13}>
        {`${value} tentatives`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#666" fontSize={12}>
        {`Succès: ${payload.success_rate}%`}
      </text>
    </g>
  );
};

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');
  const [groupBy, setGroupBy] = useState('day');
  const [activeIndex, setActiveIndex] = useState(0);

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

  const getTodayStats = () => {
    if (!stats?.timeStats) return { attempts: 0, success: 0 };
    return stats.timeStats.find(stat => {
      const today = new Date().toISOString().split('T')[0];
      const statDate = new Date(stat.date).toISOString().split('T')[0];
      return today === statDate;
    }) || { attempts: 0, success: 0 };
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  // Modifier la fonction formatTimeStats pour mieux gérer les tentatives
  const formatTimeStats = (stats) => {
    if (!stats?.timeStats) return [];
    
    // Grouper les données par date pour combiner les différents types
    const groupedByDate = stats.timeStats.reduce((acc, stat) => {
      const date = new Date(stat.date).toLocaleDateString('fr-FR', { 
        day: '2-digit',
        month: 'short'
      });
      
      if (!acc[date]) {
        acc[date] = {
          date,
          tentatives: 0,
          succès: 0,
          échecs: 0,
          'taux de succès': 0
        };
      }
      
      // Additionner les valeurs pour chaque type
      acc[date].tentatives += parseInt(stat.attempts) || 0;
      acc[date].succès += parseInt(stat.success) || 0;
      acc[date].échecs += parseInt(stat.failed) || 0;
      
      // Calculer le taux de succès global
      if (acc[date].tentatives > 0) {
        acc[date]['taux de succès'] = (acc[date].succès / acc[date].tentatives * 100).toFixed(1);
      }
      
      return acc;
    }, {});

    // Convertir l'objet en tableau et trier par date
    return Object.values(groupedByDate)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 14); // Garder les 14 derniers jours
  };

  // Fonction pour le rendu personnalisé des labels
  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 12;

    return (
      <g>
        <circle 
          cx={x + width / 2} 
          cy={y - radius} 
          r={radius} 
          fill={COLORS.bruite}
          filter="url(#shadow)"
        />
        <text 
          x={x + width / 2} 
          y={y - radius} 
          fill="#fff" 
          textAnchor="middle" 
          dominantBaseline="middle"
          fontSize="12"
          fontWeight="bold"
        >
          {value}
        </text>
      </g>
    );
  };

  // Formater les données pour la distribution horaire
  const formatHourlyData = (stats) => {
    if (!stats?.hourlyStats) return [];
    return stats.hourlyStats.map(stat => ({
      heure: `${stat.hour}h`,
      succès: parseInt(stat.success),
      échecs: parseInt(stat.failed),
      total: stat.attempts,
      'taux de succès': parseFloat(((stat.success / stat.attempts) * 100 || 0).toFixed(1))
    }));
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
              color={COLORS.bruite}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Total Succès" 
              value={toNumber(stats?.global?.total_success)}
              color={COLORS.success}
              percentage={toNumber(stats?.global?.success_rate)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Tentatives Aujourd'hui" 
              value={getTodayStats().attempts}
              color={COLORS.line}
              percentage={stats?.global?.total_attempts ? 
                (getTodayStats().attempts / stats.global.total_attempts * 100) : 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Taux de Succès Global" 
              value={`${toNumber(stats?.global?.success_rate).toFixed(1)}%`}
              color={COLORS.success}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TimelineIcon sx={{ mr: 1, color: COLORS.line }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Évolution des Tentatives
                </Typography>
              </Box>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={formatTimeStats(stats)}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={alpha('#000', 0.1)} />
                  <XAxis 
                    dataKey="date" 
                    scale="point"
                    tick={{ fill: '#666' }}
                  />
                  <YAxis 
                    yAxisId="left"
                    tick={{ fill: '#666' }}
                    label={{ 
                      value: 'Nombre de tentatives', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fill: '#666' }
                    }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 100]}
                    tick={{ fill: '#666' }}
                    label={{ 
                      value: 'Taux de succès (%)', 
                      angle: 90, 
                      position: 'insideRight',
                      style: { fill: '#666' }
                    }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="tentatives"
                    fill={alpha(COLORS.area, 0.2)}
                    stroke={COLORS.area}
                    dot={false}
                    name="Total tentatives"
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="succès"
                    fill={COLORS.success}
                    radius={[4, 4, 0, 0]}
                    name="Succès"
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="échecs"
                    fill={COLORS.failed}
                    radius={[4, 4, 0, 0]}
                    name="Échecs"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="taux de succès"
                    stroke={COLORS.line}
                    strokeWidth={2}
                    dot={{ fill: COLORS.line, r: 4 }}
                    name="Taux de succès"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card sx={{ 
              p: 3, 
              borderRadius: 2, 
              height: '100%',
              background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PieChartIcon sx={{ mr: 1, color: COLORS.bruite }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Performance par Type de Captcha
                </Typography>
              </Box>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <defs>
                    <filter id="shadow" height="200%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                    </filter>
                    <filter id="glow" height="200%">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={stats?.byType}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={95}
                    dataKey="attempts"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                  >
                    {stats?.byType?.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[entry.captcha_type] || COLORS.bruite}
                        filter="url(#shadow)"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ p: 3, borderRadius: 2, background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)' }}>
              <Typography variant="h6" sx={{ 
                mb: 3, 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <PieChartIcon sx={{ color: COLORS.bruite }} />
                Performance par Type de Captcha
              </Typography>
              
              <Grid container spacing={3} sx={{ mb: 3 }}>
                {stats.byType.map((type) => {
                  const successRate = toNumber(type.success_rate);
                  const failureRate = 100 - successRate;
                  const typeColor = COLORS[type.captcha_type] || COLORS.bruite;
                  
                  return (
                    <Grid item xs={12} sm={6} md={4} key={type.captcha_type}>
                      <Card sx={{ 
                        p: 2.5,
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        border: `1px solid ${alpha(typeColor, 0.1)}`,
                        background: `linear-gradient(135deg, ${alpha(typeColor, 0.05)}, ${alpha(typeColor, 0.02)})`,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: `0 8px 24px ${alpha(typeColor, 0.15)}`
                        }
                      }}>
                        {/* Indicateur visuel du type */}
                        <Box sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '3px',
                          background: typeColor
                        }} />

                        <Typography variant="h6" sx={{ 
                          color: typeColor,
                          mb: 2,
                          fontWeight: 600
                        }}>
                          {type.captcha_type}
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                          <Typography variant="h4" sx={{ 
                            fontWeight: 700,
                            color: 'text.primary',
                            mb: 0.5
                          }}>
                            {type.attempts}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Tentatives totales
                          </Typography>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 1 
                          }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box sx={{ 
                                width: 8, 
                                height: 8, 
                                borderRadius: '50%', 
                                bgcolor: COLORS.success 
                              }} />
                              <Typography variant="body2">
                                Succès ({toNumber(type.success)})
                              </Typography>
                            </Box>
                            <Typography variant="body2" fontWeight="600" color="success.main">
                              {successRate.toFixed(1)}%
                            </Typography>
                          </Box>
                          <Box sx={{ 
                            height: 6, 
                            bgcolor: alpha(COLORS.success, 0.2),
                            borderRadius: 3,
                            overflow: 'hidden'
                          }}>
                            <Box sx={{ 
                              height: '100%',
                              width: `${successRate}%`,
                              bgcolor: COLORS.success,
                              borderRadius: 3,
                              transition: 'width 1s ease-in-out'
                            }} />
                          </Box>
                        </Box>

                        <Box>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 1 
                          }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box sx={{ 
                                width: 8, 
                                height: 8, 
                                borderRadius: '50%', 
                                bgcolor: COLORS.failed 
                              }} />
                              <Typography variant="body2">
                                Échecs ({toNumber(type.failed)})
                              </Typography>
                            </Box>
                            <Typography variant="body2" fontWeight="600" color="error.main">
                              {failureRate.toFixed(1)}%
                            </Typography>
                          </Box>
                          <Box sx={{ 
                            height: 6, 
                            bgcolor: alpha(COLORS.failed, 0.2),
                            borderRadius: 3,
                            overflow: 'hidden'
                          }}>
                            <Box sx={{ 
                              height: '100%',
                              width: `${failureRate}%`,
                              bgcolor: COLORS.failed,
                              borderRadius: 3,
                              transition: 'width 1s ease-in-out'
                            }} />
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default Stats;