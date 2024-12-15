fetch('./animal.json')
    .then(response => response.json())
    .then(animal => {        
            animal.forEach(animal => {
                console.log(getAnimalDesc(animal));
                console.log(animalDiet(animal));
                console.log(getAge(animal));
                console.log(getAnimalName(animal));
                console.log(revenueDisplay(animal));
                console.log(expensesDisplay(animal));
                console.log(animalProfit(animal));    
            })
            const container = document.createElement('div');
            container.id = 'animalsContainer';

            animal.forEach(animal => {
            const animalDiv = document.createElement('div');
            animalDiv.className = 'animal';

            animalDiv.innerHTML = `
            <p><h1>${getAnimalName(animal)}, ${animal.commonName}</h1>
                <br>
                <ul>
                ${getAnimalDesc(animal)}
                <li>${getAnimalName(animal)} brought in $${animalProfit(animal)} this year.</li><br>
                <li>${animalDiet(animal)}</li>
            </p>
            `
;

            container.appendChild(animalDiv);
        });


        document.body.appendChild(container);
    })

    .catch(error => {
        console.error('Fetch error:', error);
    });
    
    
    function animalDiet(animal) {
        switch (animal.diet)
        {
            case "Herbivore":
                return `${animal.animalName} should be fed a PLANT based diet`;
                break;
            case "Carnivore":
                return `${animal.animalName} should be fed a MEAT based diet`;
                break;
            case "Omnivore":
                return `${animal.animalName} should be fed a MEAT and Plant based diet`;
                break;
        }
      }
    function getAnimalDesc(animal) {
        return `<li>Scientific name: ${animal.species}</li><br> <li>Age: ${getAge(animal)}</li><br> <li>Lifespan: ${animal.lifeSpan}</li><br>`;
    }

    function getAge(animal) {    
        return `${animal.animalName} is ${new Date().getFullYear() - 
            new Date(animal.birthdate).getFullYear()}`;

    }
    function getAnimalName(animal) {
        return `${animal.animalName}`
    }

    function revenueDisplay(animal) {
        return `${animal.revenue}`
    }

    function expensesDisplay(animal) {
        return `${animal.expenses}`
    }

    function animalProfit(animal) {
        return (animal.revenue) - (animal.expenses)
    }
   
    