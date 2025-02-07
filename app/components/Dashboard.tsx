import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface DashboardProps {
  formData: {
    name: string
    age: number
    lifeStageAnswers: {
      [key: string]: {
        [key: string]: {
          external: { [key: string]: number }
          internal: { [key: string]: number }
        }
      }
    }
  }
  ageSpecificSteps: {
    min: number
    max: number
    name: string
  }[]
  quotients: {
    name: string
    external: string[]
    internal: string[]
  }[]
  onRestart: () => void
}

interface LifeStageData {
  [key: string]: {
    [key: string]: {
      external: { [key: string]: number }
      internal: { [key: string]: number }
    }
  }
}

function calculateAverages(data: LifeStageData) {
  const averages: {
    [key: string]: {
      [key: string]: {
        external: number
        internal: number
        total: number
      } | number
      total: number
    }
  } = {};
  Object.keys(data).forEach(lifeStage => {
    averages[lifeStage] = { total: 0 };  // Initialize with total
    Object.keys(data[lifeStage]).forEach(quotient => {
      const external = Object.values(data[lifeStage][quotient].external);
      const internal = Object.values(data[lifeStage][quotient].internal);
      const externalAvg = external.reduce((a: number, b: number) => a + b, 0) / external.length;
      const internalAvg = internal.reduce((a: number, b: number) => a + b, 0) / internal.length;
      averages[lifeStage][quotient] = {
        external: externalAvg,
        internal: internalAvg,
        total: (externalAvg * 0.5 + internalAvg * 0.5)
      };
    });
    averages[lifeStage].total = (Object.values(averages[lifeStage])
      .filter((value): value is { external: number; internal: number; total: number } => 
        typeof value === 'object' && value !== null && 'total' in value && 'external' in value && 'internal' in value
      )
      .reduce((a, b) => a + b.total, 0) as number) / Object.keys(data[lifeStage]).length;
  });
  return averages;
}

export function Dashboard({ formData, ageSpecificSteps, quotients, onRestart }: DashboardProps) {
  const averages = calculateAverages(formData.lifeStageAnswers);
  const chartData = Object.keys(averages).map(lifeStage => ({
    name: lifeStage,
    ...Object.keys(averages[lifeStage]).reduce((acc: any, quotient) => {
      const value = averages[lifeStage][quotient];
      if (quotient !== 'total' && typeof value === 'object' && 'total' in value) {
        acc[quotient] = value.total;
      }
      return acc;
    }, {}),
    Total: averages[lifeStage].total
  }));

  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add header
    csvContent += "Life Stage,Quotient,Type,Question,Score\n";

    // Add data
    Object.entries(formData.lifeStageAnswers).forEach(([lifeStage, quotientData]) => {
      Object.entries(quotientData).forEach(([quotient, conditionData]) => {
        Object.entries(conditionData).forEach(([conditionType, questions]) => {
          Object.entries(questions).forEach(([question, score]) => {
            csvContent += `${lifeStage},${quotient},${conditionType},${question},${score}\n`;
          });
        });
      });
    });

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "4Q_Self_Reflection_Results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="bg-stone-100 border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-amber-800 text-center">Reflection Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-center text-stone-600">Thank you for your mindful reflection, {formData.name}.</p>
        
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-amber-700">Score Visualization</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[1, 7]} />
                <Tooltip />
                <Legend 
                  formatter={(value, entry) => (
                    <span style={{ color: entry.color }}>{value}</span>
                  )}
                />
                {quotients.map((quotient, index) => (
                  <Line 
                    key={index} 
                    type="monotone" 
                    dataKey={quotient.name} 
                    stroke={`hsl(${index * 15 + 20}, 70%, 35%)`} 
                    strokeWidth={2}
                    dot={{ fill: `hsl(${index * 15 + 20}, 70%, 35%)`, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
                <Line 
                  type="monotone" 
                  dataKey="Total" 
                  stroke="hsl(32, 95%, 30%)" 
                  strokeWidth={3} 
                  dot={{ fill: "hsl(32, 95%, 30%)", r: 4 }} 
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium text-amber-700">Summary Scores</h3>
          {ageSpecificSteps.map((ageGroup, ageIndex) => (
            <div key={ageIndex} className="bg-white p-4 rounded-md shadow-sm">
              <h4 className="font-medium text-stone-700 mb-2">{ageGroup.name} Stage ({ageGroup.min}-{ageGroup.max})</h4>
              {quotients.map((quotient, quotientIndex) => {
                const quotientValue = averages[ageGroup.name][quotient.name];
                return (
                  <div key={quotientIndex} className="mb-2">
                    <h5 className="font-medium text-stone-600">{quotient.name}</h5>
                    {typeof quotientValue === 'object' && 'external' in quotientValue && (
                      <p className="text-sm text-stone-600">
                        External: {quotientValue.external.toFixed(2)} | 
                        Internal: {quotientValue.internal.toFixed(2)} | 
                        Total: {quotientValue.total.toFixed(2)}
                        <span className="text-xs text-stone-500 ml-2">(1-7 scale)</span>
                      </p>
                    )}
                  </div>
                );
              })}
              <p className="font-medium text-stone-700">
                Total Score: {typeof averages[ageGroup.name].total === 'number' ? 
                  averages[ageGroup.name].total.toFixed(2) : 
                  '0.00'
                }
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium text-amber-700">Detailed Responses</h3>
          {ageSpecificSteps.map((ageGroup, ageIndex) => (
            <div key={ageIndex} className="space-y-4">
              <h4 className="font-medium text-amber-700">{ageGroup.name} Stage ({ageGroup.min}-{ageGroup.max})</h4>
              {quotients.map((quotient, quotientIndex) => (
                <div key={quotientIndex} className="bg-white p-4 rounded-md shadow-sm">
                  <h5 className="font-medium text-stone-700 mb-2">{quotient.name}</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-stone-600 mb-1">External Conditions</h6>
                      {quotient.external.map((question, qIndex) => (
                        <p key={qIndex} className="text-stone-600 text-sm">
                          {question}: {formData.lifeStageAnswers[ageGroup.name]?.[quotient.name]?.external?.[question] || 'N/A'}
                        </p>
                      ))}
                    </div>
                    <div>
                      <h6 className="font-medium text-stone-600 mb-1">Internal Conditions</h6>
                      {quotient.internal.map((question, qIndex) => (
                        <p key={qIndex} className="text-stone-600 text-sm">
                          {question}: {formData.lifeStageAnswers[ageGroup.name]?.[quotient.name]?.internal?.[question] || 'N/A'}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        
        <p className="text-center text-stone-600 mt-6">
          Remember, self-reflection is a journey. May these insights guide you on your path to mindfulness.
        </p>
        
        <div className="flex justify-center space-x-4 mt-8">
          <Button onClick={exportToCSV} className="bg-amber-600 hover:bg-amber-700 text-white">
            Export Results (CSV)
          </Button>
          <Button onClick={onRestart} className="bg-amber-600 hover:bg-amber-700 text-white">
            Restart Quiz
          </Button>
        </div>

      </CardContent>
    </Card>
  )
}

