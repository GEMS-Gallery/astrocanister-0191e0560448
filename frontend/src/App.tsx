import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { Container, Typography, Button, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Astronaut {
  name: string;
  age: number;
  specialty: string;
  background: string;
}

interface Mission {
  name: string;
  description: string;
}

const App: React.FC = () => {
  const [astronaut, setAstronaut] = useState<Astronaut | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      await backend.generateAstronaut();
      const astronautData = await backend.getAstronautProfile();
      const missionData = await backend.getMissionLog();
      if (astronautData) {
        setAstronaut(astronautData[0]);
      }
      setMissions(missionData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = {
    labels: ['Completed', 'In Progress', 'Planned'],
    datasets: [
      {
        data: [3, 2, 1],
        backgroundColor: ['#4caf50', '#ff9800', '#2196f3'],
        hoverBackgroundColor: ['#45a049', '#f57c00', '#1e88e5'],
      },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        IC Astronaut Portfolio
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<RefreshIcon />}
        onClick={fetchData}
        disabled={loading}
        sx={{ mb: 4 }}
      >
        Generate New Astronaut
      </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <div className="astronaut-avatar">
                  {astronaut?.name.charAt(0)}
                </div>
                <Typography variant="h4" component="h2" gutterBottom>
                  {astronaut?.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Age: {astronaut?.age}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Specialty: {astronaut?.specialty}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Background: {astronaut?.background}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  Mission Log
                </Typography>
                {missions.map((mission, index) => (
                  <div key={index}>
                    <Typography variant="h6" component="h4">
                      {mission.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {mission.description}
                    </Typography>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  Mission Status
                </Typography>
                <div style={{ width: '300px', margin: '0 auto' }}>
                  <Doughnut data={chartData} />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default App;
