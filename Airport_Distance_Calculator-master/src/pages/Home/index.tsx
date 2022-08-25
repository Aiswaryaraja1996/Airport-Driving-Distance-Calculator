import React, { useContext, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import MapView from "../../components/MapView";
import SearchPanel from "../../components/SearchPanel";
import { AirportContext } from "src/context/AirportContextProvider";

interface Props {}

const Home: React.FC<Props> = () => {
  const {
    source,
    destination,
    setPlotRoute,
    setDistance,
    setSource,
    setDestination,
  } = useContext(AirportContext);

  useEffect(() => {
    setDistance({ distance: 0, error: "" });
    setSource({});
    setPlotRoute(false);
    setDestination({});
  }, []);

  const handleGetDistance = () => {
    const service = new google.maps.DistanceMatrixService();
    setPlotRoute(true);
    service.getDistanceMatrix(
      {
        origins: [new google.maps.LatLng(source?.lat, source?.lng), source?.name],
        destinations: [
          new google.maps.LatLng(destination?.lat, destination?.lng),
          destination.name,
        ],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: true,
        avoidTolls: true,
      },
      (response, status) => {
        if (status !== "OK") {
          console.log("Error");
        } else {
          let origins: any = response?.originAddresses;
          let element: any, distance: any, results: any;
          for (let i = 0; i < origins.length; i++) {
            results = response?.rows[i].elements;
            for (let j = 0; j < results.length; j++) {
              element = results[j];
              distance = element.distance?.value;
            }
          }
          if (distance) {
            setDistance({ distance: distance, error: "" });
          } else {
            setDistance({ distance: 0, error: "No driving distance" });
          }
        }
      }
    );
  };

  return (
    <Box>
      <Grid container>
        <Grid item lg={5} xs={12}>
          <SearchPanel handleGetDistance={handleGetDistance} />
        </Grid>
        <Grid item lg={7} xs={12} sx={{ height: "100vh" }}>
          <MapView />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
