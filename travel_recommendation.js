function reset() {
    document.getElementById("conditionInput").value = "";
    document.getElementById("result").innerHTML = "";

    // document.querySelector('input[name="gender"]:checked').checked = false;
    // document.getElementById("age").value = "";
    // document.getElementById("condition").value = "";
}

function createResultCountry(country) {
    const cities = country.cities;
    console.log(cities);
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<br><br>";
    
    for (const city in cities) {
        resultDiv.innerHTML += `<img src="${city.imageUrl}" alt="hjh">`;
        resultDiv.innerHTML += `<h2>${city.name}</h2>`;
        resultDiv.innerHTML += `<p>${city.description}</p>`;

        resultDiv.innerHTML += `<br>`
    }
}

function createResultRecommendation(recommendations) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<br>";
    for (const recommendation of recommendations) {
        const recommendationDiv = document.createElement("div");
        recommendationDiv.style.backgroundColor = "white";
        recommendationDiv.style.color = "black";
        recommendationDiv.style.display = "inline-block";
        recommendationDiv.style.width = "400px";
        recommendationDiv.style.marginTop = "10px"; // Add margin to create separation

        const image = document.createElement("img");
        image.src = recommendation.imageUrl;
        image.alt = recommendation.name;
        image.style.width = "400px";
        image.style.height = "150px";
        recommendationDiv.appendChild(image);

        const name = document.createElement("h2");
        name.textContent = recommendation.name;
        recommendationDiv.appendChild(name);

        const description = document.createElement("p");
        description.textContent = recommendation.description;
        recommendationDiv.appendChild(description);

        resultDiv.appendChild(recommendationDiv);
        resultDiv.appendChild(document.createElement("br"));
    }
}

function search() {
    const input = document.getElementById("conditionInput").value.toLowerCase();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    fetch("travel_recommendation_api.json")
        .then((response) => response.json())
        .then((data) => {
            if (input == 'beaches' || input == 'temples') {
                createResultRecommendation(data[input]);
            } else {
                const country = data.countries.find((c) => c.name.toLowerCase() == input);
                if (country) {
                    console.log(country.cities)
                    createResultRecommendation(country.cities);

                } else {
                    resultDiv.innerHTML = "Recommendations not found.";

                }
            }
          
        })
        .catch((error) => {
            console.error("Error:", error);
            resultDiv.innerHTML = "An error occurred while fetching data.";
        });
}