import { createContext, useState, FC } from "react";

interface Props {
  children: any;
}

export type AirportContextType = {
  source?: any;
  setSource?: any;
  destination?: any;
  setDestination?: any;
  plotRoute?: any;
  setPlotRoute?: any;
  distance?: any;
  setDistance?: any;
};

const AirportContextDefaultValues: AirportContextType = {
  source: {},
  destination: {},
  plotRoute: false,
  distance: {},
};

export const AirportContext = createContext<AirportContextType>(
  AirportContextDefaultValues
);

const AirportContextProvider: FC<Props> = ({ children }) => {
  const [source, setSource] = useState<any>(AirportContextDefaultValues.source);
  const [destination, setDestination] = useState<any>(
    AirportContextDefaultValues.destination
  );
  const [plotRoute, setPlotRoute] = useState<any>(
    AirportContextDefaultValues.plotRoute
  );

  const [distance, setDistance] = useState<any>(
    AirportContextDefaultValues.distance
  );

  return (
    <AirportContext.Provider
      value={{
        source,
        setSource,
        destination,
        setDestination,
        plotRoute,
        setPlotRoute,
        distance,
        setDistance,
      }}
    >
      {children}
    </AirportContext.Provider>
  );
};

export default AirportContextProvider;
