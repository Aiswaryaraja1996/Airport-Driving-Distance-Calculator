import React, { useContext } from "react";
import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import airplaneIcon from "../../assets/pngIcons/airplaneIcon.png";
import locationIcon from "../../assets/pngIcons/locationIcon.png";
import { AirportContext } from "src/context/AirportContextProvider";
import { airports } from "../../data/us_airports";

interface Props {
  handleGetDistance?: any;
}

const SearchPanel: React.FC<Props> = ({ handleGetDistance }) => {
  const { setSource, setDestination, distance, setDistance } =
    useContext(AirportContext);
  const conversionUnit = 0.00054; //to convert miles to nauticalMiles
  const filterOptionMethod = createFilterOptions();
  const filterOptions = (options: any, state: any) => {
    const result = filterOptionMethod(options, state);
    if (result.length === 0) {
      return filterOptionMethod(options, {
        ...state,
        getOptionLabel: (o: any) => o.name.toString() || o.iata_code.toString(),
      });
    }
    return result;
  };

  const renderOption = (props: any, option: any) => (
    <Box component="li" {...props}>
      <span>
        <b>{option.iata_code}</b>
        {" - "}
        {option.name}
      </span>
    </Box>
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Stack>
        <Box style={{ backgroundColor: "#1A73E8" }}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ height: "100%" }}
          >
            <img src={airplaneIcon} alt="airplane" width="180" />
            <Typography
              sx={{ color: "white", fontSize: "30px", fontWeight: 500 }}
            >
              US AIRPORTS <br /> DISTANCE CALCULATOR
            </Typography>
          </Stack>
        </Box>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDistance(0);
            handleGetDistance();
          }}
        >
          <Stack
            spacing={3}
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%", margin: 8 }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <img src={locationIcon} alt="source" height="36" />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={airports}
                autoHighlight
                filterOptions={filterOptions}
                getOptionLabel={(option: any) =>
                  option.iata_code + "-" + option.name
                }
                renderOption={renderOption}
                onChange={(_event, newValue) => {
                  setSource(newValue);
                }}
                selectOnFocus
                sx={{ width: 400 }}
                renderInput={(params) => (
                  <TextField required {...params} label="Source Airport" />
                )}
              />
            </Stack>

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <img src={locationIcon} alt="destination" height="36" />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={airports}
                filterOptions={filterOptions}
                autoHighlight
                getOptionLabel={(option: any) =>
                  option.iata_code + "-" + option.name
                }
                onChange={(_event, newValue) => {
                  setDestination(newValue);
                }}
                renderOption={renderOption}
                selectOnFocus
                sx={{ width: 400 }}
                renderInput={(params) => (
                  <TextField required {...params} label="Destination Airport" />
                )}
              />
            </Stack>

            <Button type="submit" variant="contained">
              Get Distance
            </Button>

            {distance.distance !== 0 && distance.distance && (
              <Typography sx={{ fontSize: "22px", fontWeight: 400 }}>
                Distance :{" "}
                <span
                  style={{
                    fontSize: "22px",
                    color: "#FF0101",
                    fontWeight: 600,
                  }}
                >
                  {(Number(distance.distance) * conversionUnit)
                    .toFixed(2)
                    .toLocaleString()}{" "}
                  NM
                </span>
              </Typography>
            )}
            {distance.error && (
              <Typography
                sx={{ fontSize: "22px", fontWeight: 500, color: "#FF0101" }}
              >
                No Driving Route between the airports!
              </Typography>
            )}
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default SearchPanel;
