import './style.css';

interface HealthBarProps {
  health: number; 
}

const HealthBar: React.FC<HealthBarProps> = ({ health }) => {
  const healthAmount = Math.max(0, Math.min(100, health));
  
  let healthColor: string;
  if (healthAmount > 66) {
    healthColor = '#8fb935';
  } else if (healthAmount > 33) {
    healthColor = '#ffd700';
  } else {
    healthColor = '#e64747';
  }

  return (
    <div className="health-bar">
      <div className="health-bar__text">Zdraví: {Math.round(healthAmount)}%</div>
      <div className="health-bar__container">
        <div
          className="health-bar__fill"
          style={{ 
            width: `${healthAmount}%`,
            backgroundColor: healthColor
          }}
        />
      </div>
    </div>
  );
};

export default HealthBar;

