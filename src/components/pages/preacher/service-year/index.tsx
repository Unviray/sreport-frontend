import { useEffect, useRef, useState } from "react";
import { useTheme } from "react-jss";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

import { getServiceYear } from "@/services/home";
import Surface from "@/components/surface";
import useWorkingMonth from "@/hooks/working-month";

interface Props {
  id: number;
  registerUpdate?: (update: () => void) => void;
}

const ServiceYear = (props: Props) => {
  const { id, registerUpdate } = props;
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme<Jss.Theme>();
  const [width, setWidth] = useState(0);
  const { workingMonth } = useWorkingMonth();
  const [data, setData] = useState<{ month: string; hour: number }[]>([]);

  const update = () => {
    getServiceYear(id).then(setData);
  };

  useEffect(() => {
    registerUpdate?.(update);
  }, []);

  useEffect(() => {
    update();
  }, [workingMonth]);

  useEffect(() => {
    const intervale = setInterval(() => {
      setWidth(ref.current ? ref.current.offsetWidth : 0);
    }, 500);

    return () => clearInterval(intervale);
  }, [ref.current]);

  return (
    <Surface title="Ora nandritran'ny taom-panompoana 2022">
      <div ref={ref}>
        <BarChart
          width={width}
          height={200}
          data={data}
          margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3" vertical={false} />
          <Bar
            legendType="circle"
            dataKey="hour"
            fill={theme.colors.primary}
            radius={[4, 4, 4, 4]}
          />

          <XAxis dataKey="month" tickLine={false} tick={{ fontSize: 12 }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            width={40}
          />
        </BarChart>
      </div>
    </Surface>
  );
};

export default ServiceYear;
