  /* Example data for development and testing */
  /* Prevent from loading twice */ 
  if (!data) {
    var data = {
        "name": "Office Building Wiesbaden",
        "address": "Wiesbadener Straße 99",
        "city": "Wiesbaden",
        "type": "Office",
        "gross_space_in_squared_feet": 820,
        "floors": [
            {
                "name": "Floor 1 in Building: Office Building Wiesbaden",
                "gross_space_in_square_feet": 320,
                "used_space_in_square_feet": 220,
                "vertical_position": 1,
                "utilization_in_percent": "69%",
                "rentable_units": [
                    {
                        "name": "H&M",
                        "unit_number": 103,
                        "rented": "Ja",
                        "rental_expiry_date": "05.08.2021",
                        "renter_name": "Mrs. Kelley",
                        "rental_rate": 2500,
                        "gross_space_in_square_feet": 90,
                        "rentable_space_in_square_feet": 80
                    },
                    {
                        "name": "McDonalds",
                        "unit_number": 102,
                        "rented": "Nein",
                        "rental_expiry_date": "07.05.2020",
                        "renter_name": "Mr. John",
                        "rental_rate": 3000,
                        "gross_space_in_square_feet": 100,
                        "rentable_space_in_square_feet": 30
                    },
                    {
                        "name": "MediaMarkt",
                        "unit_number": 100,
                        "rented": "Ja",
                        "rental_expiry_date": "11.12.2020",
                        "renter_name": "Mr. Goods",
                        "rental_rate": 3400,
                        "gross_space_in_square_feet": 130,
                        "rentable_space_in_square_feet": 124
                    }
                ]
            },
            {
                "name": "Floor 2 in Building: Office Building Wiesbaden",
                "gross_space_in_square_feet": 500,
                "used_space_in_square_feet": 300,
                "vertical_position": 2,
                "utilization_in_percent": "60%",
                "rentable_units": [
                    {
                        "name": "REWE",
                        "unit_number": 105,
                        "rented": "Nein",
                        "rental_expiry_date": "10.09.2020",
                        "renter_name": "Mr. Wilkinson",
                        "rental_rate": 5000,
                        "gross_space_in_square_feet": 200,
                        "rentable_space_in_square_feet": 150
                    },
                    {
                        "name": "Saturn",
                        "unit_number": 104,
                        "rented": "Ja",
                        "rental_expiry_date": "06.03.2021",
                        "renter_name": "Mrs. Erikson",
                        "rental_rate": 4500,
                        "gross_space_in_square_feet": 300,
                        "rentable_space_in_square_feet": 290
                    }
                ]
            }
        ]
    }
}   


    /* Prevent from loading twice */ 
    if(!constants) {
        var constants = {
            /* Constants for the backgroundcolor of units in the table and the key backgroundcolor */
            vacantYearBackgroundColor:"rgb(235, 92, 52)",
            currentYearBackgroundColor:"rgb(235, 147, 52)",
            currentYearPlusOneBackgroundColor:"rgb(235, 186, 52)",
            currentYearPlusTwoBackgroundColor:"rgb(165, 235, 52)",
            currentYearPlusThreeAndMoreBackgroundColor:"rgb(51, 204, 0)"

            }
    }

    /* Set the year strings and background colors for the year keys [e.g. 2020, 2021...] */
    function setYearKeys() {
        var currentYear = new Date().getFullYear();

        $("#keyVacant").html(`<p class='text-center '>Vacant</p>`);
        $("#keyVacant").css("background-color", constants.vacantYearBackgroundColor);

        $("#keyCurrentYear").html(`<p class='text-center'>${currentYear}</p>`);
        $("#keyCurrentYear").css("background-color", constants.currentYearBackgroundColor);

        $("#keyCurrentYearPlusOne").html(`<p class='text-center'>${currentYear+1}</p>`);
        $("#keyCurrentYearPlusOne").css("background-color", constants.currentYearPlusOneBackgroundColor);

        $("#keyCurrentYearPlusTwo").html(`<p class='text-center'>${currentYear+2}</p>`);
        $("#keyCurrentYearPlusTwo").css("background-color", constants.currentYearPlusTwoBackgroundColor);

        $("#keyCurrentYearPlusThreeAndMore").html(`<p class='text-center'>${currentYear+1}+</p>`);
        $("#keyCurrentYearPlusThreeAndMore").css("background-color", constants.currentYearPlusThreeAndMoreBackgroundColor);
    }

        /* Set the key infos [e.g. the info under the years] */
        function setYearKeyInfo() {

        $("#infoVacantListGroup").append("<li class='list-group-item'>Cras justo odio</li>");
        $("#infoVacantListGroup").append("<li class='list-group-item'>Cras justo odio</li>");
        $("#infoVacantListGroup").append("<li class='list-group-item'>Cras justo odio</li>");

        $("#infoCurrentYearListGroup").append("<li class='list-group-item'>Cras justo odio</li>");

        $("#infoCurrentYearPlusOneListGroup").append("<li class='list-group-item'>Cras justo odio</li>");

        $("#infoCurrentYearPlusTwoListGroup").append("<li class='list-group-item'>Cras justo odio</li>");

        $("#infoCurrentYearPlusThreeAndMoreListGroup").append("<li class='list-group-item'>Cras justo odio</li>");
    }

    /* Set the metadata about the building in the right block next to the stacking plan */
    function setBuildingData() {
        $("#buildingDataListGroup").append(`<li class='list-group-item'><span class="buildingDataKey">Name:</span> ${data.name}</li>`);
        $("#buildingDataListGroup").append(`<li class='list-group-item'><span class="buildingDataKey">Address:</span> ${data.address}</li>`);
        $("#buildingDataListGroup").append(`<li class='list-group-item'><span class="buildingDataKey">City:</span> ${data.city}</li>`);
        $("#buildingDataListGroup").append(`<li class='list-group-item'><span class="buildingDataKey">Gross Space in sq ft:</span> ${data.gross_space_in_squared_feet}</li>`);
    }

    /* Create the table data [<td>] for every unit and store it in the floor data for later retrieval */
    function createUnitHTML() {
        for (floor of data.floors) {
            for (unit of floor.rentable_units)
                /* Why 'unit.rented == "Ja"'? Ninox returns a String instead of a boolean in a function for some reason, e.g. "Ja" for true and "Nein" for false *. Could be a problem for different languages */
                unit.html = `<td style="background-color:${unit.rented == "Ja" ? getColorForRentalExpiryYear(unit.rental_expiry_date) :constants.vacantYearBackgroundColor}" class="col-md-${getUnitWidth(floor.gross_space_in_square_feet, unit.gross_space_in_square_feet)}">
                        <p>${unit.rented == "Ja" ? "Status: Rented" : "Status: Vacant"}</p> 
                        <p>${"Name: " + unit.name}</p>
                        <p>${unit.gross_space_in_square_feet} sq ft</p>
                        <p>${unit.rented == "Ja" ? "Rental expiry date: " + unit.rental_expiry_date : "No rental expiry date"}</p>
                        </td>`
        }
    };

    /* Calculcate the width of the unit in the table row depending on the percentage of the gross space of the floor. 
       arg: floorGrossSize -> The total size of the floor in ft [number]
       arg: unitGrossSize -> The total size of the rentable unit in fr [number]
    */

    function getUnitWidth(floorGrossSize, unitGrossSize) {
        let diffOfFloorAndUnitInPercentage = unitGrossSize / floorGrossSize;
        let maxColumnGridSystem = 12;
        let diffOfGridSystem = maxColumnGridSystem * diffOfFloorAndUnitInPercentage;
        //Set return value to 1 if 0, because col-md-0 hides the block
        if (diffOfGridSystem == 0) {
            diffOfGridSystem = 1;
        }
        return Math.round(diffOfGridSystem);
    }

    /* Create HTML for floor and append to the data as a new field
       After that sort the floors by their vertical position in reverse order, so the top floor is at the beginning
    */
    function createFloorHTML() {
        for (floor of data.floors) {
            //Jede td ist eine unit
            let unitsHTML = "";
            for (unit of floor.rentable_units) {
                unitsHTML += unit.html;
            }
            floor.html = `<tr class="d-flex">
                        <th class="noBorder" scope="row">${floor.vertical_position}</th> 
                        ${unitsHTML}
                        <th class="noBorder" scope="row">${floor.gross_space_in_square_feet} sq ft <br> ${floor.utilization_in_percent} usage</th>
                    </tr>`;
        }

        data.floors.sort((floorPrev, floorNext) => floorNext.vertical_position - floorPrev.vertical_position);

    }

    /* Append the floors to the tbody of the table */
    function appendFloorsToTable() {
        for (floor of data.floors) {
            $("#stackingplan_tbody").append(floor.html);
        }
    }


    function getColorForRentalExpiryYear(year) {
        let currentYear = new Date().getFullYear();
        let expiryDate = parseDate(year).getFullYear();
        switch (expiryDate) {
            case currentYear: return constants.currentYearBackgroundColor;
            case currentYear + 1: return constants.currentYearPlusOneBackgroundColor;
            case currentYear + 2: return constants.currentYearPlusTwoBackgroundColor;
            case expiryDate >= currentYear + 3: constants.currentYearPlusThreeAndMoreBackgroundColor;
        }
    }
    /* Creates a new Date object for a date string in the format "day.month.year" 
     * arg: input -> string in the format of "day.month.year" [String]
     * source: https://stackoverflow.com/questions/2945113/how-to-create-a-new-date-in-javascript-from-a-non-standard-date-format
     */
    function parseDate(input) {
        var parts = input.match(/(\d+)/g);
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }


    /* Bootstrap function that wraps all work */
    function initTable() {
        setYearKeys();
        setYearKeyInfo();
        setBuildingData();
        createUnitHTML();
        createFloorHTML();
        appendFloorsToTable();
    };

    /* All setup, initialize the table */
    initTable();