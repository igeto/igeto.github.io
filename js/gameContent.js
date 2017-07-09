let $gameContent = $("#gameContent");
let currentAppointment = 0;
let laboratorija = 0;
let mikrobiologija = 0;
let transfuziologija = 0;
let gynecologistExplanation = `<p>Симулацијата ја препорачува оваа најблиска здравствена установа до вашето место на живеење, 
    каде што може да ги добиете поголемиот број од здравствените услуги.</p>`;
function compare(a,b) {
            if (a.distance < b.distance)
                return -1;
            if (a.distance > b.distance)
                return 1;
            return 0;
        };
let oneTest = (hospitals, contentString) => {
    hospitals.sort(compare);
    for(let i = 0; i < hospitals.length; i++)
    console.log(hospitals[i]);
    totalDistanceTraveledToGynecologist += hospitals[0].distance * 2;

    for (let i = 0; i < hospitals.length; i++) {
        let foundClosest = false;
        let distanceTraveled = 0;
        for (let j = 0; j < hospitals[i].services.length; j++) {
            if (hospitals[i].services[j] === "laboratorija") {
                distanceTraveled = hospitals[i].distance;
                $('#travelingModal').on('show.bs.modal', function(event) {
                    let modal = $(this)
                    modal.find(".modal-body").html("");
                    modal.find('.modal-title').text(hospitals[0].name)
                    modal.find('.modal-body').append(`${hospitals[0].name !== gynecologistLocation ? gynecologistExplanation : ""}<p>${hospitals[0].content}</p>`);
                    modal.find('.modal-body').append(`<p>${contentString} <strong>${Math.round(((hospitals[0].distance * 2) + (distanceTraveled * 2)) / 1000)} километри</strong> 
                        од вашето место на живеење.</p>`)
                });
                foundClosest = true
                break;
            }
        }
        if (foundClosest) {
            distanceTraveledToHospital += distanceTraveled * 2;
            console.log(distanceTraveledToHospital);
            break;
        }
    }
    $('#travelingModal').modal('show');
};
let twoTests = (testOne, testTwo, contentString) => {
    hospitals.sort(compare);
    totalDistanceTraveledToGynecologist += hospitals[0].distance * 2;
        let firstTest = 0;
        let secondTest = 0;
        for (let i = 0; i < hospitals.length; i++) {
            let distanceTraveled = 0;
            if (firstTest === 0)
                for (let j = 0; j < hospitals[i].services.length; j++) {
                    if (hospitals[i].services[j] === testOne) {
                        for (let k = 0; k < hospitals[i].services.length; k++)
                            if (hospitals[i].services[k] === testTwo)
                                secondTest = 1;
                        if (firstTest === 0)
                            distanceTraveled = hospitals[i].distance;
                        firstTest = 1;
                        $('#travelingModal').on('show.bs.modal', function(event) {
                            let modal = $(this);
                            modal.find(".modal-body").html("");
                            modal.find('.modal-title').text(hospitals[0].name);
                            modal.find('.modal-body').prepend(`<p>${hospitals[0].content}</p>`);
                        });
                        break;
                    }
                }
            if (secondTest === 0)
                for (let j = 0; j < hospitals[i].services.length; j++) {
                    if (hospitals[i].services[j] === testTwo) {
                        if (secondTest === 0) {
                            distanceTraveled += hospitals[i].distance;
                            $('#travelingModal').on('show.bs.modal', function(event) {
                                let modal = $(this);
                                modal.find(".modal-body").append(`<p>Затоа што <strong>во вашата болница нема клиника за ${testTwo === "transfuziologija" ? "трансфузиологија" : "микробиологија"}</strong> 
                            бевте препратени во болницата во ${hospitals[i].name}.</p>`);
                            });
                        }
                        secondTest = 1;
                        break;
                    }
                }
            if (firstTest + secondTest === 2) {
                distanceTraveledToHospital += distanceTraveled * 2;
                $("#travelingModal").on("show.bs.modal", function(event) {
                    let modal = $(this);
                    modal.find('.modal-body').append(`<p>${contentString} 
                        <strong>${Math.round(((hospitals[0].distance * 2) + (distanceTraveled * 2)) / 1000)} километри</strong> од вашето место на живеење.</p>`);
                });
                console.log(distanceTraveledToHospital);
                break;
            }
        }
        $('#travelingModal').modal('show');
};
let threeTests = () => {
    hospitals.sort(compare);
    totalDistanceTraveledToGynecologist += hospitals[0].distance * 2;
    laboratorija = 0;
    mikrobiologija = 0;
    transfuziologija = 0;
    for (let i = 0; i < hospitals.length; i++) {
        let distanceTraveled = 0;
        if (laboratorija === 0)
            for (let j = 0; j < hospitals[i].services.length; j++) {
                if (hospitals[i].services[j] === "laboratorija") {
                    for (let k = 0; k < hospitals[i].services.length; k++)
                        if (hospitals[i].services[k] === "mikrobiologija")
                            mikrobiologija = 1;
                    for (let k = 0; k < hospitals[i].services.length; k++)
                        if (hospitals[i].services[k] === "transfuziologija")
                            transfuziologija = 1;
                    if (laboratorija === 0)
                        distanceTraveled = hospitals[i].distance;
                    laboratorija = 1;
                    $('#travelingModal').on('show.bs.modal', function(event) {
                        let modal = $(this);
                        modal.find(".modal-body").html("");
                        modal.find('.modal-title').text(hospitals[0].name);
                        modal.find('.modal-body').prepend(`<p>${hospitals[0].content}</p>`);
                    });
                    break;
                }
            }
        if (mikrobiologija === 0)
            for (let j = 0; j < hospitals[i].services.length; j++) {
                if (hospitals[i].services[j] === "mikrobiologija") {
                    let transfuziologija2 = 0;
                    if(transfuziologija === 0){
                    for (let k = 0; k < hospitals[i].services.length; k++)
                        if (hospitals[i].services[k] === "transfuziologija")
                            transfuziologija = 1;
                            transfuziologija2 = 1;
                    }
                    if (mikrobiologija === 0) {
                        distanceTraveled += hospitals[i].distance;
                        $('#travelingModal').on('show.bs.modal', function(event) {
                            let modal = $(this);
                            modal.find(".modal-body").append(`<p>Затоа што <strong>во вашата болница нема микробиолошка лабораторија 
                        ${transfuziologija2 === 1 ? "и клиника за трансфузиологија" : ""}</strong> бевте препратени во болницата во ${hospitals[i].name}.</p>`);
                        });
                        mikrobiologija = 1;
                    }
                    break;
                }
            }
        if (transfuziologija === 0)
            for (let j = 0; j < hospitals[i].services.length; j++) {
                if (hospitals[i].services[j] === "transfuziologija") {
                    distanceTraveled += hospitals[i].distance;
                    $('#travelingModal').on('show.bs.modal', function(event) {
                        let modal = $(this);
                        modal.find(".modal-body").append(`<p>Затоа што <strong>во вашата болница нема клиника за трансфузиологија</strong> 
                    бевте препратени во болницата во ${hospitals[i].name}.</p>`);
                    });
                    transfuziologija = 1;
                    break;
                }
            }
        if (laboratorija + transfuziologija + mikrobiologija === 3) {
            distanceTraveledToHospital += distanceTraveled * 2;
            $("#travelingModal").on("show.bs.modal", function(event) {
                let modal = $(this);
                modal.find('.modal-body').append(`<p>За вашиот втор преглед кај матичниот гинеколог, како и за направените микробиолошки вагинални брисеви, 
                биохемиски анализи, траснфузиолошки анализи и одредување на вашата крвна група со RH фактор, на лекар треба да одите неколку пати. Вкупно поминавте 
                    <strong>${Math.round(((hospitals[0].distance * 2) + (distanceTraveled * 2)) / 1000)} километри</strong> од вашето место на живеење.</p>`);
            });
            console.log(distanceTraveledToHospital);
            break;
        }
    }
    $('#travelingModal').modal('show');
};
let abortion = (hospitals, contentString) => {
    hospitals.sort(compare);
    for (let i = 0; i < hospitals.length; i++) {
        let foundClosest = false;
        let distanceTraveled = 0;
        for (let j = 0; j < hospitals[i].services.length; j++) {
            if (hospitals[i].services[j] === "vaginalno poroduvanje") {
                distanceTraveled = hospitals[i].distance;
                $('#travelingModal').on('show.bs.modal', function(event) {
                    let modal = $(this)
                    modal.find(".modal-body").html("");
                    modal.find('.modal-title').text(hospitals[0].name)
                    modal.find('.modal-body').append(`<p>${hospitals[0].content}</p>`);
                    modal.find('.modal-body').append(`<p>${contentString} <strong>${Math.round((distanceTraveled * 2) / 1000)} километри</strong> 
                        од вашето место на живеење.</p>`)
                });
                foundClosest = true
                break;
            }
        }
        if (foundClosest) {
            distanceTraveledToHospital += distanceTraveled * 2;
            console.log(distanceTraveledToHospital);
            break;
        }
    }
    $('#travelingModal').modal('show');
};
let abortionFinal = (hospitals, contentString) => {
    hospitals.sort(compare);
    for (let i = 0; i < hospitals.length; i++) {
        let foundClosest = false;
        let distanceTraveled = 0;
        for (let j = 0; j < hospitals[i].services.length; j++) {
            if (hospitals[i].services[j] === "vaginalno poroduvanje") {
                distanceTraveled = hospitals[i].distance;
                $('#travelingModal').on('show.bs.modal', function(event) {
                    let modal = $(this)
                    modal.find(".modal-body").html("");
                    modal.find('.modal-title').text(hospitals[0].name)
                    modal.find('.modal-body').append(`<p>${hospitals[0].content}</p>`);
                    modal.find('.modal-body').append(`<p>${contentString} <strong>вкупно ${Math.round(totalDistanceTraveled)} километри</strong> 
                        од вашето место на живеење.</p>`)
                });
                foundClosest = true
                break;
            }
        }
        if (foundClosest) {
            distanceTraveledToHospital += distanceTraveled * 2;
            totalDistanceTraveled = (distanceTraveled * 2 + distanceTraveledToHospital + totalDistanceTraveledToGynecologist) / 1000;
            console.log(distanceTraveledToHospital);
            break;
        }
    }
    $('#travelingModal').modal('show');
};
let final = (hospitals, contentString) => {
    hospitals.sort(compare);
    for (let i = 0; i < hospitals.length; i++) {
        let foundClosest = false;
        let distanceTraveled = 0;
        for (let j = 0; j < hospitals[i].services.length; j++) {
            if (hospitals[i].services[j] === "vaginalno poroduvanje") {
                distanceTraveled = hospitals[i].distance;
                $('#travelingModal').on('show.bs.modal', function(event) {
                    let modal = $(this)
                    modal.find(".modal-body").html("");
                    modal.find('.modal-title').text(hospitals[0].name)
                    modal.find('.modal-body').append(`<p>${hospitals[0].content}</p>`);
                    modal.find('.modal-body').append(`<p>${contentString} <strong>вкупно ${Math.round(totalDistanceTraveled)} километри</strong> 
                        од вашето место на живеење.</p>`)
                });
                foundClosest = true
                break;
            }
        }
        if (foundClosest) {
            distanceTraveledToHospital += distanceTraveled * 2;
            totalDistanceTraveled = (distanceTraveled * 2 + distanceTraveledToHospital + totalDistanceTraveledToGynecologist) / 1000;
            console.log(distanceTraveledToHospital);
            break;
        }
    }
    $('#travelingModal').modal('show');
};

let firstApp = `
        <section class="fragment">
            <div class="row">
                <div class="col">
                    <div><h1>Прв Преглед (5-6 гестациска недела)</h1></div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="row">
                        <div class="col-4">
                            <div>
                            <br>
                                <p>
                                    Вашиот матичен гинеколог на првиот преглед со ехо ја потврдува бременоста, а вие може да го слушнете и срцебиењето на вашето бебе.
                                </p>
                                <p>
                                    Матичниот гинеколог на овој преглед според законот треба да ви отвори мајчина книшка, 
                                    да ви даде упат за анализа на крвта и урина која се прави во биохемиска лабораторија, 
                                    да ви го измери вашиот крвен притисок и вашата тежина, а потоа да ви препорача витаминска терапија.
                                </p>
                            </div>
                        </div>     
                        <div class="col-8 col-lg-6 offset-lg-2">
                            <img class="card-img-top" src="Assets/pregnant.jpg">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div><h5>Можни опции:</h5></div>
                        </div>
                    </div> 
                </div>               
            </div>
            <div class="row">
                <div class="col-6">
                    <button id="continueBtn" class="btn btn-primary appointmentBtn hasAbortOption ">Сакам да продолжам со бременоста</button>

                </div>
                    <div class="col-6">
                        <button id="abortBtn" class="btn btn-primary appointmentBtn isAbortOption">Сакам да абортирам</button>
                    </div>
                </div>
            </div>
        </section>
        `;
let secondApp = `
        <section class="fragment">
            <div class="row">
                <div class="col">
                    <div>
                        <h1>Втор Преглед (11-14 гестациска недела)
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="row">
                        <div class="col-4">
                            <div>
                                <br/>
                                <p>
                                    Сега ќе направиме ехо преглед, кој се вика скрининг. 
                                    На овој преглед ќе го измериме плодот. 
                                </p>
                                <p>
                                    Со специфичните димензии во вратот на плодот ќе може да откриеме дали постојат некакви аномалии. 
                                </p>
                                <p>
                                    Исто така ќе земеме и <strong>микробиолошки вагинални брисеви</strong> и ќе ве упатиме за испитување <strong>крвна група</strong>, 
                                    <strong>RH факторот</strong> и стандардните биохемиски испитувања на крв и урина.
                                </p>
                            </div>
                        </div>
                        <div class="col-8 col-lg-6 offset-lg-2">
                            <img id="anomalyImg" class="card-img-top" src="Assets/11-14.jpg">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <button id="goToHospitalBtn" class="btn btn-primary">Со неколку дневно доцнење пристигнаа резултатите од испитувањата</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
let thirdApp = `
            <section class="fragment">
                <div class="row">
                    <div class="col">
                        <div><h1>Трет преглед (18 - 22 гестациска недела)</h1></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col-5">
                                <div><br/>
                                    Во третиот ехо преглед ќе го измериме вашето бебе, односно неговата должина, обемот на неговото стомаче и развојот на мозокот. 
                                    Ќе провериме дали доволно се исхранува, односно како работи постелката.  
                                    Повторно ќе го измериме вашиот крвен притисок, вашата тежина, ќе ве упатиме за стандардни биохемиски испитувања во најблиската лабораторија
                                    и ќе добиете упатства за исхрана.
                                </div>
                            </div>
                            <div class="col-7 col-lg-6 offset-lg-1">
                                <img id="" src="Assets/18-22.jpg">
                            </div>
                        </div>
                    </div>
                </div>
                            
                            <br>

                <div class="row">
                    <div class="col-3">
                        <div class="card btnDescriptionSmall">
                            <div class="card-block">
                                <p class="card-text"><strong>Резултатите не ви се во ред</strong>, потребни ви се дополнителни испитувања</p>
                            </div>
                            <button id="thirdExam_aditionalExamination" class="btn btn-primary">Ќе направам испитувања</button>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="card btnDescriptionSmall">
                            <div class="card-block">
                                <p class="card-text">Вашиот наод од ехото укажува на <strong>отстапки од стандардниот раст и развој</strong> на плодот.</p>
                            </div>
                            <button id="anomaly" class="btn btn-primary">Избери</button>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="card btnDescriptionSmall">
                            <div class="card-block">
                                <p class="card-text"><strong>Резултатите ви се во ред</strong>. Честитам, вашето бебе се развива нормално, а вие се чувствувате одлично.</p>
                            </div>
                            <button id="resultsOkThirdAppBtn" class="btn btn-primary">Ќе закажам следен преглед</button>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="card btnDescriptionSmall">
                            <div class="card-block">
                                <p class="card-text"><strong>Плодот не е жив</strong>, следува прекин на бременоста</p>
                            </div>
                            <button id="stopPregnancyBtn" class="btn btn-primary ">Ќе ја прекинам бременоста</button>
                        </div>
                    </div>
                </div>
            </section>
        `;
let fourthApp = `
        <section class="fragment">
            <div class="row">
                <div class="col">
                    <div>
                        <h2>Четврти преглед (24 - 28 гестациска недела)</h2>
                    </div>
                    <div class="row">
                        <div class="col">
                            
                            <p>
                                Во овој преглед ќе го измериме вашето бебе, односно неговата должина, 
                                обемот на стомачето и развојот на мозокот. Ќе провериме дали доволно се исхранува, 
                                односно како работи постелката.
                            </p>
                            <p>Повторно ќе го измериме вашиот крвен притисок, 
                                вашата тежина и ќе ве упатиме за стандардни биохемиски испитувања.</p>
                            <p>И во овој дел од бременост неопходно е да направите испитување за <strong>скриен шеќер</strong>, 
                                <strong>хемостаза</strong> и <strong>д-димери</strong> што ќе ни ја покажат точната состојба на квалитетот на вашата крв.</p>
                        </div>
                        <div class="col-7">
                            <img id="" src="Assets/24-28weeks.jpg">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button id="goToHospitalBtnForthApp" class="btn btn-primary">Со неколкудневно доцнење пристигнаа резултатите од испитувањата</button>
                </div>
            </div>
        </section>
    `;
let fifthApp = `
            <section class="fragment">
                <div class="row">
                    <div class="col">
                        <div>
                            <h2>Петти преглед (30 - 34 гестациска недела)</h2>
                        </div>
                        <div class="row">
                            <div class="col-5 col-lg-7">
                                <p>Во овој преглед ќе го измериме вашето бебе, односно неговата должина, обемот на неговото стомаче и развојот на мозокот. Ќе провериме дали доволно се исхранува, односно како работи постелката.</p>
                                <p>Повторно ќе го измериме вашиот крвен притисок, вашата тежина. Ќе ве упатиме на стандардни биохемиски испитувања во најблиската лабораторија. Ќе добиете упат за повторна <strong>микробиолошка анализа на вагиналните брисеви.</strong></p>
                            </div>
                            <div class="col-7 col-lg-5">
                                <img id="" src="Assets/30-34.jpg">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button id="goToHospitalBtnFifthApp" class="btn btn-primary">Со неколку дневно доцнење пристигнаа резултатите од испитувањата</button>
                    </div>
                </div>
            </section>
    `;
let sixthApp = `
            <section class="fragment">
                <div class="row">
                    <div class="col">
                        <div>
                            <h2>Шести преглед (36 - 38 гестациска недела)</h2>
                        </div>
                        <div class="row">
                            <div class="col-5 col-lg-7">
                                <p>Во овој ехо преглед ќе го измериме вашето бебе, односно неговата тежина и должина на неговите раце и нозе. Ќе провериме дали постелката доволно добро го храни бебето.</p> 
                                <p>Повторно ќе го измериме вашиот крвен притисок и вашата тежина. Ќе ве упатиме на стандардни биохемиски испитувања во најблиската лабораторија.</p>
                                <p>Од овој преглед ќе почнеме со правење на <strong>ЦТГ</strong>, односно ќе ја мериме активноста на вашата матка и работата на срцето на вашето бебе.</p>
                            </div>
                            <div class="col-7 col-lg-5">
                                <img id="" src="Assets/30-34.jpg">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button id="goToHospitalBtnSixthApp" class="btn btn-primary">Со неколку дневно доцнење пристигнаа резултатите од испитувањата</button>
                    </div>
                </div>
            </section>
        `;
let goToHospitalBtnForthApp = `
            <section class="fragment">
                <div class="row">
                    <div class="col-3">
                        <div class="card btnDescriptionMedium">
                            <div class="card-block">
                                <p class="card-text"><strong>Резултатите ви се во ред</strong>. Честитам, вашето бебе се развива нормално, а вие се чувствувате одлично.</p>
                            </div>
                            <button id="resultOkForthAppBtn" class="btn btn-primary">Ќе закажам следен преглед</button>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="card btnDescriptionMedium">
                            <div class="card-block">
                                <p class="card-text">Вашиот наод од ехото укажува на <strong>отстапки од стандардниот раст и развој</strong> на плодот.</p>
                            </div>
                            <button id="" class="btn btn-primary anomalyForthApp">Следниот чекор е...</button>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="card btnDescriptionMedium ">
                            <div class="card-block">
                                <p class="card-text"><strong>Добивте вагинално крварење</strong>. И по дадената терапија тоа продолжува. Добивате упат до најблиската болница.</p>
                            </div>
                            <button id="" class="btn btn-primary vagBleedingBtnFourth">Одам во болница</button>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="card btnDescriptionMedium">
                            <div class="card-block">
                                <p class="card-text">
                                    <strong>Вашиот плод не е жив</strong>, потребна е провокација за породување и прекин на бременост.
                                </p>
                            </div>
                            <button id="stopPregnancyBtn" class="btn btn-primary ">Ја прекинувам бременоста</button>
                        </div>
                    </div>
                </div>
            </section>
        `;
let vagBleedingBtnSixth = `
            <section class="fragment">
                <div class="row">
                    <div class="col">
                        <div class="card">
                            <div class="card-block">
                                <p>
                                    Мора итно да биде извршена интервенција, затоа што крварењето е животозагрозувачко.
                                </p>
                            </div>
                            <button class="btn btn-primary finishAbortionSixthApp">Ќе извршам интервенција</button>
                        </div>
                    </div>
                </div>
            </section>
        `;
let vagBleedingBtnFourth = `
    <section class="fragment">
                <div class="row">
                    <div class="col">
                        <div class="card">
                            <div class="card-block">
                                <p>
                                    Мора итно да биде извршена интервенција, затоа што крварењето е животозагрозувачко.
                                </p>
                            </div>
                            <button class="btn btn-primary vaginalBleedingFourthApp">Ќе извршам интервенција</button>
                        </div>
                    </div>
                </div>
            </section>
    `;
let death = `
            <section class="fragment">
                <div class="row">
                    <div class="col">
                        <p>Според податоците од Државниот завод за статистика во 2016 година, <strong>бројот на мртвородени бебиња изнесува 195</strong>, додека во  првата година од животот <strong>починале 273 доенчиња.</strong></p>
                        <p>Нема јавно достапна евиденција кои биле причините за смртноста на овие бебиња. Според искуствата во болниците, честопати родителите одбиваат да се направи обдукција на плодот за да се испитаат и утврдат причините поради настанувањето на смртта. </p>
                        <p class="fact"><i>Според податоци од светска здравствена организација аномалиите на плодот и здравствените проблеми на родителите се најчестите причини за смртност на плодот.Според податоци од светска здравствена организација аномалиите на плодот и здравствените проблеми на родителите се најчестите причини за смртност на плодот.</i></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button id="restartBtn" class="btn btn-primary appointmentBtn restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
                    </div>
                </div>
            </section>
        `;
let deathForthAppBtn = `
            <section class="fragment">
                <div class="row">
                    <div class="col">
                        <p>Според невладините организации, лекарска пракса е да се почитува процедурата во која се чека најмалку три дена за да се состане Комисијата која ќе го разгледува вашето барање во државната болница. По <strong>десеттата недела од бременоста</strong>, според законот, жената која сака да ја прекине бременоста мора да исполнува услови пропишани со последните измени на законот во 2013 година.</p>
                        <p>Комисијата составена од интернист, социјален работник и гинеколог има право да не одобри прекин на бременост поради субјективна оценка дека родилката не ги исполнува законските критериуми или да не се согласи со наодот на матичниот гинеколог и да побара дополнителни прегледи за потврдување на дијагнозата.</p>
                        <p>Во дел од медиумите изминативе години се појавија сведоштва на родилки кои тврдат дека бирократските процедури за нив траеле и по девет дена. Поради стресот и траумата низ кои минале, деновите им изгледале како вечност.</p>
                        <p>Со воведувањето на задолжителен период на чекање во законот по извршеното советување се зголемува и емотивниот стрес што жената го доживува во ситуација кога се соочува со прекинување на бременост. Дури и кога носи мртов плод како резултат на спонтан абортус, пракса е  лекарите под закана од високи глоби предвидени во Законот за прекинување на бременоста, да чекаат да помине задолжителниот период од три дена, наместо веднаш да го отстранат плодот кој директно го загрозува животот на жената, велат од невладината организација ХЕРА.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button id="restartBtn" class="btn btn-primary appointmentBtn restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
                    </div>
                </div>
            </section>
        `;
let embrionNotAliveFourthApp = `
    <section class="fragment">
                <div class="row">
                    <div class="col">
                        <p>
                            Според податоците од Државниот завод за статистика во 2016 година, бројот на <strong>мртвородени бебиња изнесува 195</strong>, додека во  првата година од животот <strong>починале 273 доенчиња</strong>.  
                        </p>
                        <p>
                            Нема јавно достапна евиденција кои биле причините за смртноста на овие бебиња. Според искуствата во болниците, честопати родителите одбиваат да се направи обдукција на плодот за да се испитаат и утврдат причините поради настанувањето на смртта. 
                            <br/>
                        </p>
                        <p class="fact"><i>Според податоци од светска здравствена организација аномалиите на плодот и здравствените проблеми на родителите се најчестите причини за смртност на плодот. Проблеми во бременоста може да предизвикаат и одредени лекови или користење на дроги.</i></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button id="restartBtn" class="btn btn-primary appointmentBtn restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
                    </div>
                </div>
            </section>
    `;
let anomalyForthApp = `
            <section class="fragment">
                <div class="row">
                    <div class="col-6">
                        <div class="card btnDescriptionSmall">
                            <div class="card-block">
                                <p>
                                    Аномалиите на плодот директно го загрозуваат животот на мајката, гинекологот препорачува прекин на бременоста.
                                </p>
                            </div>
                            <button id="stopPregnancyBtn" class="btn btn-primary ">Ја прекинувам бременоста</button>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card btnDescriptionSmall">
                            <div class="card-block">
                                <p>
                                    Откриените аномалии се потенцијална закана за понатамошен нормален раст и развој на плодот. Мораме да ве хоспитализираме и да ја следиме бременоста.
                                </p>
                            </div>
                            <button id="" class="btn btn-primary fifthApp">Следниот чекор е...</button>
                        </div>
                    </div>
                </div>
            </section>
        `;
let finishAbortionForthApp = `
            <section class="fragment">
                <div class="row">
                    <div class="col">
                        <div class="card btnDescriptionLarge">
                            <div class="card-block">
                                <p>
                                    За време на интервенцијата, настанаа компликации кои доведоа до загрозување на животот на мајката и плодот, докторите не успееа да го спасат плодот
                                </p>
                                <p>Според податоците од Државниот завод за статистика во 2016 година, бројот на <strong>мртвородени бебиња изнесува 195</strong>, додека во  првата година од животот <strong>починале 273 доенчиња.</strong> </p>
                                <p>Според податоците од институтот за јавно здравје, во Македонија бројот на  жени кои умреле во текот на бременоста, породувањето или кратко по породувањето изнесува <strong>145</strong> во 2015 година.</p>
                            </div>
                            <button class="btn btn-primary finishAbortionForthApp restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card btnDescriptionLarge">
                            <div class="card-block">
                                <p>Крварењето е запрено, но потребни се почести контроли и прегледи.</p>
                                <p>Следува хоспитализација, за следење и превенирање од повторно крварење. Во меѓувреме, ќе бидат испитани и причините кои доведоа до ваквата ризична состојба</p>
                                <p>Специјалистите утврдија дека станува збор за патолошка бременоста, ќе мора да мирувате подолго време и да побарате од вашиот матичен гинеколог да ви го отвори порано боледувањето.</p>
                            </div>
                            <button class="btn btn-primary fifthApp">Ќе закажам следен преглед</button>
                        </div>
                    </div>
                </div>
            </section>
        `;
let vaginalBleedingFourthApp = `
    <section class="fragment">
                <div class="row">
                    <div class="col">
                        <div class="card btnDescriptionLarge">
                            <div class="card-block">
                                <p>
                                    За време на интервенцијата, настанаа компликации кои доведоа до загрозување на животот на мајката и плодот, докторите не успееа да го спасат плодот
                                </p>
                                <p>Според податоците од Државниот завод за статистика во 2016 година, бројот на <strong>мртвородени бебиња изнесува 195</strong>, додека во  првата година од животот <strong>починале 273 доенчиња.</strong> </p>
                                <p>Според податоците од институтот за јавно здравје, во Македонија бројот на  жени кои умреле во текот на бременоста, породувањето или кратко по породувањето изнесува <strong>145</strong> во 2015 година.</p>
                            </div>
                            <button class="btn btn-primary finishAbortionForthApp restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card btnDescriptionLarge">
                            <div class="card-block">
                                <p>Крварењето е запрено, но потребни се почести контроли и прегледи.</p>
                                <p>Следува хоспитализација, за следење и превенирање од повторно крварење. Во меѓувреме, ќе бидат испитани и причините кои доведоа до ваквата ризична состојба</p>
                                <p>Специјалистите утврдија дека станува збор за патолошка бременоста, ќе мора да мирувате подолго време и да побарате од вашиот матичен гинеколог да ви го отвори порано боледувањето.</p>
                            </div>
                            <button class="btn btn-primary fifthApp">Ќе закажам следен преглед</button>
                        </div>
                    </div>
                </div>
            </section>
    `;

let vaginalBleedingSixthApp = `
    <section class="fragment">
                <div class="row">
                    <div class="col">
                        <div class="card btnDescriptionLarge">
                            <div class="card-block">
                                <p>
                                    За време на интервенцијата, настанаа компликации кои доведоа до загрозување на животот на мајката и плодот, докторите не успееа да го спасат плодот
                                </p>
                                <p>Според податоците од Државниот завод за статистика во 2016 година, бројот на <strong>мртвородени бебиња изнесува 195</strong>, додека во  првата година од животот <strong>починале 273 доенчиња.</strong> </p>
                                <p>Според податоците од институтот за јавно здравје, во Македонија бројот на  жени кои умреле во текот на бременоста, породувањето или кратко по породувањето изнесува <strong>145</strong> во 2015 година.</p>
                            </div>
                            <button class="btn btn-primary finishAbortionForthApp restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card btnDescriptionLarge">
                            <div class="card-block">
                                <p>Крварењето е запрено, но потребни се почести контроли и прегледи.</p>
                                <p>Следува хоспитализација, за следење и превенирање од повторно крварење. Во меѓувреме, ќе бидат испитани и причините кои доведоа до ваквата ризична состојба</p>
                                <p>Специјалистите утврдија дека станува збор за патолошка бременоста, ќе мора да мирувате подолго време и да побарате од вашиот матичен гинеколог да ви го отвори порано боледувањето.</p>
                            </div>
                            <button class="btn btn-primary seventhApp">Ќе закажам следен преглед</button>
                        </div>
                    </div>
                </div>
            </section>
    `;
let goToHospitalBtnFifthApp = `
            <section class="fragment">
                <div class="row">
                    <div class="col-4">
                        <div class="card btnDescriptionSmall">
                            <div class="card-block">
                                <p class="card-text">
                                    <strong>Вашите резултати се во ред.</strong> Продолжете со редовната контрола на вашата бременост.
                                </p>
                            </div>
                            <button id="" class="btn btn-primary sixthApp">Ќе закажам следен преглед</button>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card btnDescriptionSmall">
                            <div class="card-block">
                                <p class="card-text">
                                    Вашиот ехо наод укажува на <strong>отстапки од стандардниот раст и развој</strong> на плодот.
                                </p>
                            </div>
                            <button id="" class="btn btn-primary anomalyFifthApp">Следниот чекор е...</button>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card btnDescriptionSmall ">
                            <div class="card-block">
                                <p class="card-text">
                                    <strong>Ненадејно</strong> почна породувањето.
                                </p>
                            </div>
                            <button id="" class="btn btn-primary birthPains">Одам во болница</button>
                        </div>
                    </div>
                </div>
            </section>
        `;
let birthPains = `
        <section class="fragment">
            <div class="row">
                <div class="col">
                    <div class="card ">
                        <div class="card-block">
                            <p class="card-text">
                                Поради симптомите на предвремено породување кои ги добивте, односно болки, крварење и прснат воденик, мора да се завршува бременоста со породување..
                            </p>
                        </div>
                        <button class="btn btn-primary finishPregnancy">Следува раѓање</button>
                    </div>
                </div>
            </div>
        </section>            
        `;
let finishPregnancySuccess = `
        <section class="fragment">
            <div class="row">
                <div class="col">
                <div class="card ">
                    <div class="card-block">
                        <p>
                            <strong>Честитки.</strong> 
                            Имавте успешно породување и бебето е живо. Но, бидејќи е предвреме родено, 
                            потребно е вашето бебе да биде транспортирано до детската клиника во Скопје, 
                            затоа што само таму има услови за соодветна грижа и терапија на предвреме родени бебиња.
                        </p>
                        <p class="fact"><i>Според дел од медиумите најновото неонатално транспортно возило е од 2013 година. Тогашната директорка на детската клиника Аспазија Софијанова истакна дека ова е <strong>единствено амбулантно возило</strong> со таква опрема, кое чини <strong>130 илјади евра</strong>, а ќе овозможи брзо и безбедно пренесување на предвреме родените бебиња од цела Македонија во Скопје. Но според црната статистика во земјава, неопходно е да се инвестира во овој сегмент за, барем во дел  да се намали смртноста на новороденчињата и доенчињата кои не добиле навремена лекарска помош.</i></p>
                    </div>
                </div>
                    <button id="" class="btn btn-primary appointmentBtn restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
                </div>
            </div>
        </section>            
        `;
let finishPregnancyFail = `
        <section class="fragment">
            <div class="row">
                <div class="col">
                    <div class="card ">
                        <div class="card-block">
                            <p>Болницата нема соодветни услови за нега на предвремено родено бебе, а нема ни достапно возило со инкубатор за транспорт на вашето бебе до детската клиника во Скопје. По неколку часа, бебето почина.</p>
                            <p class="fact"><i>Според податоците од Државниот завод за статистика во 2016 година, бројот на <strong>мртвородени</strong> бебиња изнесува <strong>195</strong>, додека во  првата година од животот <strong>починале 273 доенчиња.</strong></i></p>
                            <p class="fact"><i>Според податоците од институтот за јавно здравје, во Македонија <strong>бројот на  жени кои умреле</strong> во текот на бременоста, породувањето или кратко по породувањето <strong>изнесува 145</strong> во 2015 година.</i></p>
                        </div>
                    </div>
                    <button id="" class="btn btn-primary appointmentBtn restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
                </div>
            </div>
        </section>                
        `;
let anomalyFifthApp = `
            <section class="fragment">
                <div class="row">
                    <div class="col-6">
                        <div class="card btnDescription">
                            <div class="card-block">
                                <p>
                                    Аномалиите на плодот директно го загрозуваат животот на мајката, гинекологот препорачува прекин на бременоста.
                                </p>
                            </div>
                            <button id="stopPregnancyBtn" class="btn btn-primary ">Ја прекинувам бременоста</button>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card btnDescription">
                            <div class="card-block">
                                <p class="card-text">
                                    Откриените аномалии се потенцијална закана за понатамошен нормален раст и развој на плодот. 
                                    Мораме да ве хоспитализираме и да ја следиме бременоста.
                                </p>
                            </div>
                            <button id="goodAnomalyFifthAppBtn" class="btn btn-primary ">Следниот чекор е...</button>
                        </div>
                    </div>
                </div>
            </section>
        `;
let goToHospitalSixthApp = `
            <section class="fragment">
                <div class="row">
                    <div class="col">
                        <div class="card btnDescription">
                            <div class="card-block">
                                <p class="card-text">
                                    Вашите резултати се во ред. Продолжете со редовната контрола на вашата бременост.
                                </p>
                            </div>
                            <button id="" class="btn btn-primary seventhApp">Ќе закажам следен преглед</button>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card btnDescription">
                            <div class="card-block">
                                <p class="card-text">Вашиот ехо наод укажува на сериозни здравствени нарушувања, гинекологот ви препорачува да ја прекинете бременоста.</p>
                            </div>
                            <button id="" class="btn btn-primary anomalySixthApp">Следниот чекор е...</button>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card btnDescription ">
                            <div class="card-block">
                                <p class="card-text">
                                    Добивте <strong>вагинално крварење</strong>
                                </p>
                            </div>
                            <button id="" class="btn btn-primary vagBleedingBtnFourth">Одам во болница</button>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card btnDescription">
                            <div class="card-block">
                                <p class="card-text">Добивте породилни болки. <strong>Раѓањето почна</strong></p>
                            </div>
                            <button id="" class="btn btn-primary laborPain">Одам во болница</button>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card btnDescription">
                            <div class="card-block">
                                <p class="card-text"><strong>Ви прсна воденикот</strong></p>
                            </div>
                            <button id="" class="btn btn-primary waterBrokeBtn">Одам во болница</button>
                        </div>
                    </div>
                </div>
            </section>
    `;
let seventhApp = `
    <section class="fragment">
        <div class="row">
            <div class="col">
                <h2>Седми преглед (38 - 42 гестациска недела)</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-5 col-lg-7">
                <div>
                    <p>
                        Во овој преглед освен проверка со ехо, ќе направиме и ЦТГ, односно ќе ја измериме активноста на 
                        вашата матка и работата на срцето на вашето бебе. Ќе ви дадеме болнички упат за породување.
                    </p>
                </div>
            </div>
            <div class="col-7 col-lg-5">
                <img id="" src="Assets/38-42.jpg">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button id="birthSeventhApp" class="btn btn-primary">Подигнав упат за породување</button>
            </div>
        </div>
    </section>`;

let birthSeventhApp = `<section class="fragment">
            <div class="row">
                <div class="col-3">
                    <div class="card btnDescription">
                        <div class="card-block">
                            <p class="card-text"><strong>Крварите обилно</strong>, вашата постелка се одлепи предвреме.</p>
                        </div>
                        <button id="vagBleedSeventhApp" class="btn btn-primary naturalBirth">Следува итно породување</button>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card btnDescription">
                        <div class="card-block">
                            <p class="card-text">Добивте <strong>породилни болки</strong>.</p>
                        </div>
                        <button id="laborPainsBtn" class="btn btn-primary naturalbirth">Изберете</button>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card btnDescription ">
                        <div class="card-block">
                            <p class="card-text"><strong>Ви прсна воденик</strong>.</p>
                        </div>
                        <button id="" class="btn btn-primary naturalBirth waterBrokeBtn">Изберете</button>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card btnDescription">
                        <div class="card-block">
                            <p class="card-text"><strong>Ви помина терминот за раѓање</strong>, закажете термин за индукција на породување.</p>
                        </div>
                        <button id="inductionBirthBtn" class="btn btn-primary naturalBirth">Изберете</button>
                    </div>
                </div>
            </div>
        </section>`;

let inductionBirthBtn = `<section class="fragment">
            <div class="row">
                <div class="col-6">
                    <div class="card btnDescription">
                        <div class="card-block">
                            <h6 class="card-text">
                                Вагинално породување
                            </h6>
                            <p class="card-text">
                                Вашето раѓање започна, бидејќи сакате да се породите природно, во следните неколку часа, ќе бидете следени од медицинскиот тим во болницата.
                            </p>
                        </div>
                        <button id="" class="btn btn-primary vaginaBirthBtn">Сакам и анестезија</button>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card btnDescription">
                        <div class="card-block">
                            <h6 class="card-text">
                                Царски рез.
                            </h6>
                            <p class="card-text">
                                По неколку часовните болки, дојде до застој во нормалниот тек на природното породување. Потребно е да се направи царски рез.
                            </p>
                        </div>
                        <button id="" class="btn btn-primary cSectionBtn">Ме носат во операциона сала</button>
                    </div>
                </div>
            </div>
        </section>`;

let waterBrokeBtn = `
        <section class="fragment">
            <div class="row">
                <div class="col-6">
                    <div class="card btnDescription">
                        <div class="card-block">
                            <h6><strong>Вагинално породување</strong></h6>
                            <p>
                                Вашето раѓање започна, бидејќи сакате да се породите природно, во следните неколку часа, ќе бидете следени од медицинскиот тим во болницата.
                            </p>
                        </div>
                        <button id="" class="btn btn-primary vaginaBirthBtn">Сакам и анестезија</button>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card btnDescription">
                        <div class="card-block">
                            <h6 class="card-text"><strong>Царски рез.</strong></h6>
                            <p>
                                По неколку часовните болки, дојде до застој во нормалниот тек на природното породување. Потребно е да се направи царски рез.
                            </p>
                        </div>
                        <button id="" class="btn btn-primary cSectionBtn">Ме носат во операциона сала</button>
                    </div>
                </div>
            </div>
        </section>`;

let laborPainsBtn = `<section class="fragment">
            <div class="row">
                <div class="col-6">
                    <div class="card btnDescription">
                        <div class="card-block">
                            <h6>
                                <strong>Вагинално породување</strong>
                            </h6>
                            <p>
                                Вашето раѓање започна, бидејќи сакате да се породите природно, во следните неколку часа, ќе бидете следени од медицинскиот тим во болницата.
                            </p>
                        </div>
                        <button id="" class="btn btn-primary vaginaBirthBtn">Сакам и анестезија</button>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card btnDescription">
                        <div class="card-block">
                            <h6 class="card-text">
                                <strong>Царски рез</strong>
                            </h6>
                            <p>
                                По неколку часовните болки, дојде до застој во нормалниот тек на природното породување. Потребно е да се направи царски рез.
                            </p>
                        </div>
                        <button id="" class="btn btn-primary cSectionBtn">Ме носат во операциона сала</button>
                    </div>
                </div>
            </div>
        </section>`;

let vagBleedSeventhApp = `<section class="fragment">
            <div class="row">
                <div class="col-6">
                    <div class="card btnDescription">
                        <div class="card-block">
                            <p>
                                Крварите обилно, вашата постелка се одлепи предвреме.
                            </p>
                        </div>
                        <button id="emergencyLabor" class="btn btn-primary">Следува итно породување</button>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card btnDescription">
                        <div class="card-block">
                            <p>
                                Крварите обилно, мора итно да се заврши раѓањето со царски рез.
                            </p>
                        </div>
                        <button id="emergencyCSection" class="btn btn-primary">Следува царски рез</button>
                    </div>
                </div>
            </div>
        </section>`;
let emergencyLabor = `
    <section class="fragment">
        <div class="row">
            <div class="col">
                <p><strong>Жалам</strong>, поради настанатите компликации вашето бебе почина при раѓање.</p>
                <p>Минатата година во Македонија, родени се <strong>23 199</strong> деца од кои мртвородени се <strong>197</strong>, покажуваат податоците од Државниот завод за статистика. Една од причините за смртност на новороденчиња се компликациите кои настануваат при раѓањето. Во Македонија покрај недостаток на матични гинеколози, евидентен е и проблемот со недостапноста до трансфузиолошки одделенија низ градовите во земјава.</p>
                <p>Тоа значи дека доколку итно е потребна крв, неопходно е се бара крв од најблиската болница во која има што има резерви на крв. Лекарите анестезиолози со кои разговаравме се жалат дека често пати, процедурата околу набавка на потребата крв трае и по неколку часа, што сериозно го зголемува времето во кое треба да се интервенира за да се спаси човечки живот.</p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button id="restartBtn" class="btn btn-primary appointmentBtn restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
            </div>
        </div>
    </section>
    `;
let emergencyCSection = `
    <section class="fragment">
        <div class="row">
            <div class="col">
                <p><strong>Честитки</strong>, раѓањето заврши, имавте успешен царски рез. Родивте здраво машко бебе, кое тежи <strong>3,2 килограми</strong> и е долго <strong>51 сантиметри</strong>. Но, по неколку дена вашето тело разви сепса. Причина за тоа беше интерхоспиталната инфекција што ја добивте од нестерилен медицински материјал.</p>
                <p>Во изминатава година во Македонија се родени <strong>23 199</strong> деца од кои живородени се <strong>23 002</strong> додека бројот на мртвородени изнесува <strong>197</strong>, покажуваат податоците од Државниот завод за статистика. Но, симтоматично е тоа што нема јавно достапни информации за колкава е вкупната бројката на починати жени во време на бременост во изминативе години. Единствено во еден од годишните извештаи на <strong>УНИЦЕФ</strong> е наведено дека стапката на смртност на родилки изнесува <strong>4,3</strong> во <strong>2013</strong> година. </p>
                <p class="fact"><i>Според проценките на Светска здравствена организација само <strong>11 проценти</strong> од вкупно 17 проценти регистрирани смртни случаи на жени настанале за време на породувањето, додека <strong>50</strong> до <strong>70 проценти</strong> од нив се резултат на компликации по породувањето. СЗО смета дека постојат две главни причини за смртност на родилки. Првата група причини се директни акушерски во кои се вбројуваат компликации за време на бременост, нелегални абортуси или несоодветен третман во болница. Додека втората група на причини се индиректните односно заболувања кои настанале пред или за време на бременоста. </i></p>
                <p>Како најчеста причина за смртност на доенчињата и новороденчињата, познавачите на оваа област велат дека е предвременото пораѓање кое во вкупната бројка влегува со <strong>70 проценти</strong>. Потоа следуваат аномалиите со <strong>12 проценти</strong> и инфекциите односно сепсата со <strong>10 проценти</strong>. Останати се породилни трауми, задушувања и слично.</p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button id="restartBtn" class="btn btn-primary appointmentBtn restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
            </div>
        </div>
    </section>
    `;
let vaginaBirthBtnSuccsess = `<section class="fragment">
                <div class="row">
                    <div class="col">
                        <div>
                            <div>
                                <p><strong>Честитки</strong>, родивте здраво женско бебе кое тежи  2,9 килограми, а е долго е 45 сантиметри. Вие сте истоштена, но среќна мајка.</p>
                                <p>Во изминатава година во Македонија се родени <strong>23 199</strong> деца од кои живородени се <strong>23 002</strong> додека бројот на мртвородени изнесува <strong>197</strong>, покажуваат податоците од Државниот завод за статистика. </p>
                                <p>Во <strong>2010</strong> година Владата усвои Стратегија за безбедно мајчинство во период од <strong>2010- 2015</strong> година со цел намалување на смртноста на родилките, новороденчињата и доенчињата, која во тој период е за два пати повисока од европскиот просек. Но, оттогаш состојбата наместо да се подобри се влошува, покажуваат анализите на невладините Реактор и на Здружението за еманципација, солидарност и еднаквост на жените. Стапката на перинатална смртност, односно мртвородени и починати при раѓање во <strong>2014</strong> изнесува <strong>14, 2</strong> што е речиси тројно повисока вредност од европската која изнесува <strong>5,2</strong>. За споредба во регионот истата година, таа изнесувала <strong>8,9</strong> во Србија, <strong>11</strong> во Бугарија и <strong>10,2</strong> во Турција.  Според податоците од <strong>2014</strong> година, во Македонија најголем раст на стапките за смртност се бележи во Дојран, Берово и Крушево, градови во кои нема матични гинеколози, е заклучокот на анализата  на Реактор. </p>
                                <p class="fact"><i>Едни од главните причини за зголемената смртност  се недостатокот на матични гинеколози и гинеколошки установи, особено во општините со највисока стапка на смртност во државата, како и  недоволните пари кои државата ги одвојува од буџетот за превентивна здравствена заштита на мајките и децата, пари кои секоја година се намалуваат и пренаменуваат за други цели се вели во анализата на Платформата за родова еднаквост. </i></p>
                                <p class="fact"><i>Од Платформата укажуваат дека условите се особено лоши во помалите општини каде се уште нема матичен гинеколог. Жените од помалите места и руралните подрачја, како резултат на недостатокот на гинеколози и нефункционалните породилишта, немаат пристап до примарна здравствена заштита во антенаталниот и периодот по породувањето. Дополнителен проблем е и незаконска наплата кај матичните гинеколози, како и трошоците за партиципација кои се на товар на жените.</i></p>
                            </div>
                            <button id="" class="btn btn-primary appointmentBtn restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
                        </div>                        
                    </div>
                </div>
            </section>`;

let vaginaBirthBtnFail = `<section class="fragment">
                <div class="row">
                    <div class="col">
                        <div class="">
                            <div>
                                <p><strong>Честитки</strong>, раѓањето заврши, имавте успешен царски рез. Родивте здраво машко бебе, кое тежи <strong>3,2 килограми</strong> и е долго <strong>51 сантиметри</strong>. Но, по неколку дена вашето тело разви сепса. Причина за тоа беше интерхоспиталната инфекција што ја добивте од нестерилен медицински материјал.</p>
                                <p>Во изминатава година во Македонија се родени <strong>23 199</strong> деца од кои живородени се <strong>23 002</strong> додека бројот на мртвородени изнесува <strong>197</strong>, покажуваат податоците од Државниот завод за статистика. Но, симтоматично е тоа што нема јавно достапни информации за колкава е вкупната бројката на починати жени во време на бременост во изминативе години. Единствено во еден од годишните извештаи на <strong>УНИЦЕФ</strong> е наведено дека стапката на смртност на родилки изнесува <strong>4,3</strong> во <strong>2013</strong> година. </p>
                                <p class="fact"><i>Според проценките на Светска здравствена организација само <strong>11 проценти</strong> од вкупно 17 проценти регистрирани смртни случаи на жени настанале за време на породувањето, додека <strong>50</strong> до <strong>70 проценти</strong> од нив се резултат на компликации по породувањето. СЗО смета дека постојат две главни причини за смртност на родилки. Првата група причини се директни акушерски во кои се вбројуваат компликации за време на бременост, нелегални абортуси или несоодветен третман во болница. Додека втората група на причини се индиректните односно заболувања кои настанале пред или за време на бременоста. </i></p>
                                <p class="fact">Како најчеста причина за смртност на доенчињата и новороденчињата, познавачите на оваа област велат дека е предвременото пораѓање кое во вкупната бројка влегува со <strong>70 проценти</strong>. Потоа следуваат аномалиите со <strong>12 проценти</strong> и инфекциите односно сепсата со <strong>10 проценти</strong>. Останати се породилни трауми, задушувања и слично.</p>
                            </div>
                            <button id="" class="btn btn-primary appointmentBtn restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
                        </div>
                    </div>
                </div>
            </section>`;

let cSectionBtnSuccsess = `<section class="fragment">
                <div class="row">
                    <div class="col">
                        <div>
                            <div>
                                <p>Честитки, родивте здраво женско бебе кое тежи  2,9 килограми, а е долго е 45 сантиметри. Вие сте истоштена, но среќна мајка.</p>
                                <p>Во изминатава година во Македонија се родени <strong>23 199</strong> деца од кои живородени се <strong>23 002</strong> додека бројот на мртвородени изнесува <strong>197</strong>, покажуваат податоците од Државниот завод за статистика. </p>
                                <p>Во <strong>2010</strong> година Владата усвои Стратегија за безбедно мајчинство во период од <strong>2010- 2015</strong> година со цел намалување на смртноста на родилките, новороденчињата и доенчињата, која во тој период е за два пати повисока од европскиот просек. Но, оттогаш состојбата наместо да се подобри се влошува, покажуваат анализите на невладините Реактор и на Здружението за еманципација, солидарност и еднаквост на жените. Стапката на перинатална смртност, односно мртвородени и починати при раѓање во <strong>2014</strong> изнесува <strong>14, 2</strong> што е речиси тројно повисока вредност од европската која изнесува <strong>5,2</strong>. За споредба во регионот истата година, таа изнесувала <strong>8,9</strong> во Србија, <strong>11</strong> во Бугарија и <strong>10,2</strong> во Турција.  Според податоците од <strong>2014</strong> година, во Македонија најголем раст на стапките за смртност се бележи во Дојран, Берово и Крушево, градови во кои нема матични гинеколози, е заклучокот на анализата  на Реактор. </p>
                                <p class="fact"><i>Едни од главните причини за зголемената смртност  се недостатокот на матични гинеколози и гинеколошки установи, особено во општините со највисока стапка на смртност во државата, како и  недоволните пари кои државата ги одвојува од буџетот за превентивна здравствена заштита на мајките и децата, пари кои секоја година се намалуваат и пренаменуваат за други цели се вели во анализата на Платформата за родова еднаквост. </i></p>
                                <p class="fact"><i>Од Платформата укажуваат дека условите се особено лоши во помалите општини каде се уште нема матичен гинеколог. Жените од помалите места и руралните подрачја, како резултат на недостатокот на гинеколози и нефункционалните породилишта, немаат пристап до примарна здравствена заштита во антенаталниот и периодот по породувањето. Дополнителен проблем е и незаконска наплата кај матичните гинеколози, како и трошоците за партиципација кои се на товар на жените.</i></p>
                            </div>
                            <button id="" class="btn btn-primary appointmentBtn restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
                        </div>
                    </div>
                </div>
            </section>`;

let cSectionBtnFail = `<section class="fragment">
                    <div class="row">
                        <div class="col">
                            <div class="card btnDescriptionExtraLarge">
                                <div class="card-block">
                                    <p><strong>Честитки</strong>, раѓањето заврши, имавте успешен царски рез. Родивте здраво машко бебе, кое тежи <strong>3,2 килограми</strong> и е долго <strong>51 сантиметри</strong>. Но, по неколку дена вашето тело разви сепса. Причина за тоа беше интерхоспиталната инфекција што ја добивте од нестерилен медицински материјал.</p>
                                    <p>Во изминатава година во Македонија се родени <strong>23 199</strong> деца од кои живородени се <strong>23 002</strong> додека бројот на мртвородени изнесува <strong>197</strong>, покажуваат податоците од Државниот завод за статистика. Но, симтоматично е тоа што нема јавно достапни информации за колкава е вкупната бројката на починати жени во време на бременост во изминативе години. Единствено во еден од годишните извештаи на <strong>УНИЦЕФ</strong> е наведено дека стапката на смртност на родилки изнесува <strong>4,3</strong> во <strong>2013</strong> година. </p>
                                    <p class="fact"><i>Според проценките на Светска здравствена организација само <strong>11 проценти</strong> од вкупно 17 проценти регистрирани смртни случаи на жени настанале за време на породувањето, додека <strong>50</strong> до <strong>70 проценти</strong> од нив се резултат на компликации по породувањето. СЗО смета дека постојат две главни причини за смртност на родилки. Првата група причини се директни акушерски во кои се вбројуваат компликации за време на бременост, нелегални абортуси или несоодветен третман во болница. Додека втората група на причини се индиректните односно заболувања кои настанале пред или за време на бременоста. </i></p>
                                    <p class="fact">Како најчеста причина за смртност на доенчињата и новороденчињата, познавачите на оваа област велат дека е предвременото пораѓање кое во вкупната бројка влегува со <strong>70 проценти</strong>. Потоа следуваат аномалиите со <strong>12 проценти</strong> и инфекциите односно сепсата со <strong>10 проценти</strong>. Останати се породилни трауми, задушувања и слично.</p>
                                </div>
                                <button id="" class="btn btn-primary appointmentBtn restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
                            </div>
                        </div>
                    </div>
                </section>`;
let continueBtn = `
            <section class="fragment">
                <div class="row">
                    <div class="col">
                        <div><h5>Можни опции доколку одлучите да продолжите со бременоста:</h5></div>
                    </div>
                </div>
                <div class="row">
                        <div class="col-6">

                            <button id="nextAppBtn" class="btn btn-primary appointmentBtn makeSecApp">Ќе го закажам следниот преглед</button>

                        </div>
                        <div class="col-6">
                            <button id="jumpAppBtn" class="btn btn-primary appointmentBtn">Ќе го скокнам следниот преглед</button>
                        </div>
                </div>
            </section>
        `;
let jumpAppBtn = `
            <section class="fragment">
                <div class="row">
                    <div class="col">
                        <div>
                            <p><h6>Предупредување:</h6>
                            Кај жените со тенденција за пропуштање или доцнење со одредени прегледи се зголемува опасноста од спонтан абортус или неоткривање 
                            на одредени здравствени проблеми кај родилката или можни аномалии во понатамошниот развој на фетусот.</p>
                            <p><h6>Препорака:</h6>
                            <p>Со редовни контроли на бременоста се намалува ризикот од смртност на новороденчиња и доенчиња. 
                            Една од причините за тоа е можноста навреме да се откријат здравствени проблеми кои може да влијаат на развојот на плодот и матичниот гинеколог 
                            да ви препише соодветна терапија. Ризична бременост може да настане ако родилката има уринарна инфекција, hepatit C или HIV, дијабет, висок крвен 
                            притисок, епилепсија или пак некаков вид на тумор.</p>
                            <p>Под ризична бременост се смета и доколку претходно родилката имала проблеми со предвремено 
                            породување, преeкламсија или родила дете со генетски проблем. Дополнително со редовни гинеколошки контроли во текот на бременоста може навреме 
                            да се утврди дали плодот има аномалии или не.</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <button id="nextAppBtnAnommaly" class="btn btn-primary appointmentBtn thirdApp">Закажи следен преглед</button>
                    </div>
                    <div class="col-6">
                        <button id="jumpAllApp" class="btn btn-primary appointmentBtn">Скокни ги сите прегледи</button>
                    </div>
                </div>
            </section>
        `;
let abortBtn = `
            <section class="fragment abortionIntro">
                <div id="" class="row">
                    <div class="col">
                        <div>
                            <h4>Процедура за прекин на бременоста</h4>
                            <p>
                                Според невладините организации, лекарска пракса е да се почитува процедурата во која се чека најмалку три дена да се состане 
                                Комисијата која ќе го разгледува вашето барање во државната болница. По 10 десетта недела од бременоста, според законот, жената 
                                која сака да ја прекине бременоста мора да исполнува услови пропишани со последните измени на законот во 2013 година. 
                                Комисијата составена од интернист, социјален работник и гинеколог, има право да не одобри прекин на бременост поради субјективна оценка 
                                дека родилката не ги исполнува законските критериуми.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button id="submitAbortBtn" class="btn btn-primary appointmentBtn">Поднеси барање</button>
                    </div>
                </div>
            </section>
        `;
let abortBtnFirstApp = `
            <section class="fragment abortionIntro">
                <div id="" class="row">
                    <div class="col">
                        <div>
                            <h4>Процедура за абортус</h4>
                            <p>
                                Според невладините организации, лекарска пракса е да се почитува процедурата во која се чека најмалку три дена да се состане 
                                Комисијата која ќе го разгледува вашето барање во државната болница. По 10 десетта недела од бременоста, според законот, жената 
                                која сака да ја прекине бременоста мора да исполнува услови пропишани со последните измени на законот во 2013 година. 
                                Комисијата составена од интернист, социјален работник и гинеколог, има право да не одобри прекин на бременост поради субјективна оценка 
                                дека родилката не ги исполнува законските критериуми.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button id="submitAbortBtn" class="btn btn-primary appointmentBtn">Поднеси барање</button>
                    </div>
                </div>
            </section>
        `;
let stopPregnancyBtn = `
            <section class="fragment abortionIntro">
                <div id="" class="row">
                    <div class="col">
                        <div>
                            <h4>
                                Процедура за прекин на бременост:
                            </h4>
                            <p>
                                Поднесете барање за прекин на бременост во најблиската болница. 
                                Комисијата ги разгледува барањата еднаш неделно.  
                                Таа има субјективно право да одлучува дали ќе ви биде дозволено прекин на бременоста, 
                                односно дали ги исполнувате условите припишани со последните законски измени од 2013 година.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-6">
                        <button id="submitAbortBtnThirdApp" class="btn btn-primary appointmentBtn">Поднеси барање</button>
                    </div>
                    <div class="col-6">

                        <button id="backBtn" class="btn btn-primary backBtn">Назад</button>
                    </div>
                </div>
            </section>
        `;
let abortWithAnomalyBtn = `
            <section class="fragment abortionIntro">
                <div id="" class="row">
                    <div class="col">
                        <div>
                            <h4>Процедура за прекин на бременоста</h4>
                            <p>
                                Според невладините организации, лекарска пракса е да се почитува процедурата во која се чека најмалку три дена да се состане 
                                Комисијата која ќе го разгледува вашето барање во државната болница. По 10 десетта недела од бременоста, според законот, жената 
                                која сака да ја прекине бременоста мора да исполнува услови пропишани со последните измени на законот во 2013 година. 
                                Комисијата составена од интернист, социјален работник и гинеколог, има право да не одобри прекин на бременост поради субјективна оценка 
                                дека родилката не ги исполнува законските критериуми.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button id="submitAbortBtn" class="btn btn-primary appointmentBtn">Поднеси барање</button>
                    </div>
                </div>
            </section>
        `;
let submitAbortBtnFail = `
                <section class="fragment firstCommision">
                    <div id="" class="row">
                        <div class="col">
                            <div>
                                <h5>Не добивте дозвола за прекинување на бременоста, дали сакате да поднесете барање до второстепена комисија?</h5>
                                <p>Комисијата одлучи дека нема загрозување по животот на мајката или плодот и го одби вашето барање.</p>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <button id="secCommisionYesBtn" class="btn btn-primary appointmentBtn">Да</button>
                        </div>
                        <div class="col-6">
                            <button id="secCommisionNoBtn" class="btn btn-primary appointmentBtn cancelAbortion">Не</button>
                        </div>
                    </div>
                </section>
        `;
let submitAbortBtnSuccess = `
                <section class="fragment firstCommision">
                    <div class="row">
                        <div class="col">
                            <div>
                                <h5>Добивте дозвола за прекин на бременоста, закажете прекин на бременост во болница?</h5>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <button id="" class="btn btn-primary appointmentBtn finishAbortionSecApp">Да</button>
                        </div>
                        <div class="col-6">
                            <button id="" class="btn btn-primary appointmentBtn cancelAbortion">Не</button>
                        </div>
                    </div>
                </section>
            `;
let submitAbortBtnSuccessThirdApp = `
    <section class="fragment firstCommision">
                    <div class="row">
                        <div class="col">
                            <div>
                                <h5>Добивте дозвола за прекин на бременоста, закажете прекин на бременост во болница?</h5>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <button id="" class="btn btn-primary appointmentBtn finishAbortionSecApp">Да</button>
                        </div>
                        <div class="col-6">
                            <button id="" class="btn btn-primary appointmentBtn cancelAbortion">Не</button>
                        </div>
                    </div>
                </section>
    `;
let submitAbortBtnFailThirdApp = `
    <section class="fragment firstCommision">
                    <div id="" class="row">
                        <div class="col">
                            <div>
                                <h5>Не добивте дозвола за прекинување на бременоста, дали сакате да поднесете барање до второстепена комисија?</h5>
                                <p>Комисијата одлучи дека нема загрозување по животот на мајката или плодот и го одби вашето барање.</p>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <button id="thirdCommisionYesBtn" class="btn btn-primary appointmentBtn">Да</button>
                        </div>
                        <div class="col-6">
                            <button id="secCommisionNoBtn" class="btn btn-primary appointmentBtn cancelAbortion">Не</button>
                        </div>
                    </div>
                </section>
    `;
let secCommisionYesBtnFail = `
        <section class="fragment">
            <div class="row">
                <div class="col">
                    <div class="row">
                        <div class="col-5">
                            <div>
                                <h5>Второстепената комисија не го одобри вашето барање за абортус, приморани сте да продолжите сo бременоста.</h5>
                                <p>Комисијата одлучи дека нема загрозување по животот на мајката или плодот и го одби вашето барање, воедно тука истекува и рокот за безбеден абортус.</p>
                            </div>
                        </div>
                        <div class="col-7">
                            <div>
                                <img class="card-img-top" src="Assets/administrativeStop.jpg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button id="secCommisionYesBtnFail" class="btn btn-primary appointmentBtn">Закажи го следниот преглед</button> 
                </div>
            </div>
        </section>
    `;
let secCommisionYesBtnSuccess = `
    <section class="fragment secondCommision">
        <div class="row">
            <div class="col">
                <div>
                    <h5>Добивте дозвола за прекин на бременоста, дали сакате да закажете интервенција во болница?</h5>
                    <p>По измените во законот за прекин на бременост кои стапија на сила пред четири години, во Македонија се бележи намалување на легално извршените абортуси. Неофицијално, невладините организации предупредуваат дека во пораст се нелегалните интервенции за прекин на бременоста. Проблемот е во сложената процедура која има за цел да ги предомисли жените кои сакаат да ја прекинат бременоста.</p>
                    <p>Во приватните болници законските процедури се запазуваат технички, додека во државните болници, лекарите строго се придржуваат до законот и процедурите, со што жените заглавуваат во неколку дневни бирократски лавиринти по што им се отежнува патот до абортус, а со тоа им се скратува и времето за безбеден прекин на бременоста. Не ретко се случува, првостепената, па и второстепената комисија да заклучи дека жената која сака да ја прекине бременоста не ги исполнува законските критериуми и да не ѝ биде одобрено абортирање.</p>
                    <p class="fact"><i>Според податоците во дел од медиумите, во 2015 година во Македонија вкупниот број на пријавени и регистрирани абортуси изнесува <strong>4.587</strong>, додека во 2014 година, тој број изнесува <strong>4.983</strong>. Според праксата во гинеколошките ординации, најчесто абортираат жени на возраст од 25 до 32 години.</i></p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <button class="btn btn-primary appointmentBtn restartBtn" id="restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
            </div>
        </div>
    </section>
    `;
let secCommisionYesBtnSuccessThirdApp = `
    <section class="fragment secondCommision">
        <div class="row">
            <div class="col">
                <div>
                    <h5>Добивте дозвола за прекин на бременоста, дали сакате да закажете интервенција во болница?</h5>
                    <p>По измените во законот за прекин на бременост кои стапија на сила пред четири години, во Македонија се бележи намалување на легално извршените абортуси. Неофицијално, невладините организации предупредуваат дека во пораст се нелегалните интервенции за прекин на бременоста. Проблемот е во сложената процедура која има за цел да ги предомисли жените кои сакаат да ја прекинат бременоста.</p>
                    <p>Во приватните болници законските процедури се запазуваат технички, додека во државните болници, лекарите строго се придржуваат до законот и процедурите, со што жените заглавуваат во неколку дневни бирократски лавиринти по што им се отежнува патот до абортус, а со тоа им се скратува и времето за безбеден прекин на бременоста. Не ретко се случува, првостепената, па и второстепената комисија да заклучи дека жената која сака да ја прекине бременоста не ги исполнува законските критериуми и да не ѝ биде одобрено абортирање.</p>
                    <p class="fact"><i>Според податоците во дел од медиумите, во 2015 година во Македонија вкупниот број на пријавени и регистрирани абортуси изнесува <strong>4.587</strong>, додека во 2014 година, тој број изнесува <strong>4.983</strong>. Според праксата во гинеколошките ординации, најчесто абортираат жени на возраст од 25 до 32 години.</i></p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <button class="btn btn-primary appointmentBtn restartBtn" id="restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
            </div>
        </div>
    </section>
    `;
let secCommisionYesBtnFailThirdApp = `
    <section class="fragment">
            <div class="row">
                <div class="col">
                    <div class="row">
                        <div class="col-5">
                            <div>
                                <h5>Второстепената комисија не го одобри вашето барање за прекин на бременоста, приморани сте да продолжите сo бременоста.</h5>
                                <p>Комисијата одлучи дека нема загрозување по животот на мајката или плодот и го одби вашето барање, воедно тука истекува и рокот за безбеден абортус.</p>
                            </div>
                        </div>
                        <div class="col-7">
                            <div>
                                <img class="card-img-top" src="Assets/administrativeStop.jpg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button id="secCommisionYesBtnFail" class="btn btn-primary appointmentBtn">Закажи го следниот преглед</button> 
                </div>
            </div>
        </section>
    `;
let goThroughWithAbortion = `
            <section class="fragment">
                <div class="row">
                    <div class="col">
                        <p>
                            По измените во законот за прекин на бременост кои стапија на сила пред четири години, во Македонија се бележи <strong>намалување на легално извршените абортуси</strong>. Неофицијално, невладините организации предупредуваат дека во <strong>пораст се нелегалните интервенции за прекин на бременоста</strong>. Проблемот е во сложената процедура која има за цел да ги предомисли жените кои сакаат да ја прекинат бременоста.
                        </p>
                        <p>
                             Во приватните болници законските процедури се запазуваат технички, додека во државните болници, лекарите строго се придржуваат до законот и процедурите, со што жените заглавуваат во неколку дневни бирократски лавиринти по што им се отежнува патот до абортус, а со тоа им се скратува и времето за безбеден прекин на бременоста. Не ретко се случува, првостепената, па и второстепената комисија да заклучи дека жената која сака да ја прекине бременоста не ги исполнува законските критериуми и да не ѝ биде одобрено абортирање.
                        </p>
                        <p class="fact">
                            <i>
                                Според податоците во дел од медиумите, во 2015 година во Македонија вкупниот број на пријавени и регистрирани абортуси изнесува <strong>4.587</strong>, додека во 2014 година, тој број изнесува <strong>4.983</strong>. Според праксата во гинеколошките ординации, најчесто абортираат жени на возраст од 25 до 32 години.
                            </i>
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button id="restartBtn" class="btn btn-primary appointmentBtn restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
                    </div>
                </div>
            </section>
        `;
let finishAbortion = `
            <section class="fragment">
                <div class="row">
                    <div class="col">
                        <p>
                            По измените во законот за прекин на бременост кои стапија на сила пред четири години, во Македонија се бележи <strong>намалување на легално извршените абортуси</strong>. Неофицијално, невладините организации предупредуваат дека во <strong>пораст се нелегалните интервенции за прекин на бременоста</strong>. Проблемот е во сложената процедура која има за цел да ги предомисли жените кои сакаат да ја прекинат бременоста.
                        </p>
                        <p>
                             Во приватните болници законските процедури се запазуваат технички, додека во државните болници, лекарите строго се придржуваат до законот и процедурите, со што жените заглавуваат во неколку дневни бирократски лавиринти по што им се отежнува патот до абортус, а со тоа им се скратува и времето за безбеден прекин на бременоста. Не ретко се случува, првостепената, па и второстепената комисија да заклучи дека жената која сака да ја прекине бременоста не ги исполнува законските критериуми и да не ѝ биде одобрено абортирање.
                        </p>
                        <p class="fact">
                            <i>
                                Според податоците во дел од медиумите, во 2015 година во Македонија вкупниот број на пријавени и регистрирани абортуси изнесува <strong>4.587</strong>, додека во 2014 година, тој број изнесува <strong>4.983</strong>. Според праксата во гинеколошките ординации, најчесто абортираат жени на возраст од 25 до 32 години.
                            </i>
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button id="restartBtn" class="btn btn-primary appointmentBtn restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
                    </div>
                </div>
            </section>
        `;
let finishAbortionSecApp = `
    <section class="fragment">
                <div class="row">
                    <div class="col">
                        <p class="fact">
                            <i>
                                Според статистичките здравствени податоци, аномалиите на плодот се јавуваат кај три до пет проценти од живородените деца. Тие се најчеста причина за смртност кај доенчињата уште во првата година од нивниот живот.
                            </i>
                        </p>
                        <p class="fact">
                            <i>
                                Според податоците од Државниот завод за статистика, во 2016 година во првата година од животот <strong>починале 273 доенчиња</strong>, додека при раѓање <strong>починале 195</strong>. Нема јавно достапна евиденција кои биле причините за смртноста на овие бебиња.
                            </i> 
                        </p>
                        <p>
                            Аномалиите во основа се пореметување на гените и хромозомите. Таквите промени настануваат поради наследна генетска причина или поради одредени болести на мајката за време на бременоста. Може да настанат и поради некои лекови кои мајката ги користи за време на бременоста или, пак, од непознати причини. 
                        </p>
                        <p class="fact">
                            <i>
                                Генетските испитувања како амниоцентеза, ПРИСКА или НИФТИ тест во раната бременост можат со сигурност да потврдат или исклучат аномалија. Фондот за здравство ги покрива овие тестови само доколку се направени во МАНУ или ГАК во Скопје.
                            </i>
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button id="restartBtn" class="btn btn-primary appointmentBtn restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
                    </div>
                </div>
            </section>
    `;
let jumpAllBtn = `
            <section class="fragment">
                <div class="row">
                    <div class="col">
                        <h4>Бременоста заврши.</h4>
                        <p class="fact"><i>Според последните податоци, во Македонија најмалку <strong>10 проценти</strong> од бремените жени не посетуваат гинеколог. Во владината стратегија за безбедно мајчинство за периодот од 2010 до 2015 година е наведено дека жените во Македонија во просек три пати во текот на една бременост посетуваат гинеколог, што е под усвоениот стандард.</i></p>
                        <p>За една вработена жена да стекне право за породилно боледување е неопходно да направи најмалку седум прегледи кај матичниот гинеколог за да се смета дека нејзината бременост е уредно контролирана.</p>
                        <p>Според препораките од лекарите, <strong>неконтролирана бременост е ризична</strong> бременост со неколку пати зголемени шанси за несакан исход по мајката и бебето во кој било временски период од бременоста.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button id="restartBtn" class="btn btn-primary appointmentBtn restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
                    </div>
                </div>
            </section>
        `;

let goToHospitalBtn = `
            <section class="fragment">
                <div class="row">
                    <div class="col-3">
                        <div class="card btnDescription">
                            <div class="card-block">
                                <p class="card-text">
                                    <strong>Резултатите се во ред</strong>. Честитки, вашето бебе се развива нормално.
                                </p>
                                <p class="card-text">
                                    И вие се чувствувате одлично.
                                </p>
                            </div>
                            <button id="resultOkSecAppBtn" class="btn btn-primary thirdApp">Ќе закажам следен преглед</button>
                        </div>
                    </div>
                
                    <div class="col-3">
                        <div class="card btnDescription">
                            <div class="card-block">
                                <p class="card-text">
                                    <strong>Резултатите од микробиолошките и биохемиски испитувања не се во ред</strong>. Гинекологот ви препиша соодветна терапија и исхрана. 
                                </p>
                                <p class="card-text">
                                    Придржувајте се кон советите. 
                                </p>
                            </div>
                            <button id="anomalySecAppBtn" class="btn btn-primary thirdApp">Ќе закажам следен преглед</button>
                        </div>
                    </div>
                
                    <div class="col-3">
                        <div class="card btnDescription">
                            <div class="card-block">
                                <p class="card-text">Откривме аномалии на плодот коишто не се животозагрозувачки, 
                                но се закана за нормален раст и развој на плодот. <br/>
                                Потребни се почести контроли и соодветна нега<strong>(патолошка бременост)</strong></p>
                            </div>
                            <button id="dangerOption" class="btn btn-primary thirdApp hasAbortOption">Ќе продолжам со бременоста</button>
                        </div>
                    </div>

                    <div class ="col-3">
                        <div class="card btnDescription">
                            <div class="card-block">
                                <p class="card-text"><strong>Откривме аномалии</strong> на плодот коишто не се животозагрозувачки, 
                                но се закана за нормален раст и развој на плодот.</p>
                            </div>
                            <button id="abortBtnSecApp" class="btn btn-primary abortWithAnomalyBtn isAbortOption">Ќе ја прекинам бременоста</button>
                        </div>
                    </div>
                </div>
            </section>
        `;
let thirdExam_aditionalExamination = `
            <section class="fragment">
                <div class="row">
                    <div class="col">
                        <div class="card btnDescriptionSmall ">
                            <div class="card-block">
                                <p class="card-text">Вашите резултати укажуваат на сериозни здравствени нарушувања, гинекологот ви препорачува да ја прекинете бременоста</p>
                            </div>
                            <button id="endPregnancyThirdApp" class="btn btn-primary anomaly">Сакам да ја прекинам бременоста</button>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card btnDescriptionSmall ">
                            <div class="card-block">
                                <p class="card-text">
                                    Потребно е да се извршат дополнителни анализи во најблиската болница или поликлиника.
                                    Направете ги анализите за да ви биде препишана соодветна терапија и закажете го следниот преглед
                                </p>
                            </div>
                            <button id="analysis" class="btn btn-primary fourthAppointment">Изберете</button>
                        </div>
                    </div>
                </div>
            </section>
        `;

let anomalyThirdApp = `
            <section class="fragment">
                <div class="row">
                    <div class="col">
                        <div class="card btnDescriptionMedium ">
                            <div class="card-block">
                                <p class="card-text"><strong>Аномалиите не се животозагрозувачки</strong>, но се закана за нормален раст
                                    и развој на плодот. Треба да донесете одлука дали сакате да продолжите со бременоста или не?
                                </p>
                            </div>
                            <button id="stopPregnancyBtn" class="btn btn-primary isAbortOption">Ќе ја прекинам бременоста</button>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card btnDescriptionMedium ">
                            <div class="card-block">
                                <p class="card-text"><strong>Аномалиите се животозагрозувачки</strong> за мајката или за плодот.
                                    Треба да закажете провокација за породување во најблиската болница.    
                                </p>
                            </div>
                            <button id="stopPregnancyBtn" class="btn btn-primary hasAbortOption">Ќе ја прекинам бременоста</button>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card btnDescriptionMedium ">
                            <div class="card-block">
                                <p class="card-text">Аномалиите не се животозагрозувачки, но се <strong>закана за нормален раст
                                    и развој на плодот</strong>. Треба да донесете одлука дали сакате да продолжите со бременоста или не?
                                </p>
                            </div>
                            <button id="forthAnommaly" class="btn btn-primary hasAbortOption">Ќе продолжам со бременоста</button>
                        </div>
                    </div>
                </div>
            </section>
        `;
let anomaly = `
            <section class="fragment">
                <div class="row">
                    <div class="col">
                        <div class="card btnDescription ">
                            <div class="card-block">
                                <p class="card-text">Аномалиите не се животозагрозувачки, но се закана за нормален раст
                                    и развој на плодот. Треба да донесете одлука дали сакате да продолжите со бременоста или не?
                                </p>
                            </div>
                            <button id="" class="btn btn-primary abortBtn isAbortOption">Ќе ја прекинам бременоста</button>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card btnDescription ">
                            <div class="card-block">
                                <p class="card-text">Аномалиите се животозагрозувачки за мајката или за плодот.
                                    Треба да закажете провокација за породување во најблиската болница.    
                                </p>
                            </div>
                            <button id="forcedLabor" class="btn btn-primary hasAbortOption">Ќе ја прекинам бременоста</button>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card btnDescription ">
                            <div class="card-block">
                                <p class="card-text">Аномалиите не се животозагрозувачки, но се закана за нормален раст
                                    и развој на плодот. Треба да донесете одлука дали сакате да продолжите со бременоста или не?
                                </p>
                            </div>
                            <button id="forthAnommaly" class="btn btn-primary hasAbortOption">Ќе продолжам со бременоста</button>
                        </div>
                    </div>
                </div>
            </section>
        `;
let anomalySixthApp = `
    <section class="fragment">
                <div class="row">
                    <div class="col">
                        <div class="card btnDescription ">
                            <div class="card-block">
                                <p class="card-text">Аномалиите не се животозагрозувачки, но се закана за нормален раст
                                    и развој на плодот. Треба да донесете одлука дали сакате да продолжите со бременоста или не?
                                </p>
                            </div>
                            <button id="" class="btn btn-primary abortBtn isAbortOption">Ќе ја прекинам бременоста</button>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card btnDescription ">
                            <div class="card-block">
                                <p class="card-text">Аномалиите се животозагрозувачки за мајката или за плодот.
                                    Треба да закажете провокација за породување во најблиската болница.    
                                </p>
                            </div>
                            <button id="stopPregnancyBtn" class="btn btn-primary hasAbortOption">Ќе ја прекинам бременоста</button>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card btnDescription ">
                            <div class="card-block">
                                <p class="card-text">Аномалиите не се животозагрозувачки, но се закана за нормален раст
                                    и развој на плодот. Треба да донесете одлука дали сакате да продолжите со бременоста или не?
                                </p>
                            </div>
                            <button id="sixthAnomaly" class="btn btn-primary hasAbortOption">Ќе продолжам со бременоста</button>
                        </div>
                    </div>
                </div>
            </section>
    `;
let forcedLabor = `
            <section class="fragment">
                <div class="row">
                    <div class="col">
                        <p>
                            Во овој дел од бременоста, доколку Комисијата го потврди наодот на матичниот гинеколог според кој станува збор за животозагрозувачки аномалија, одобрува прекин на бременоста. Во оваа фаза од развојот на плодот, прекинот се врши со провокација за породување во болница.
                        </p>
                        <p><i>Според статистичките здравствени податоци, аномалиите на плодот се јавуваат кај три до пет проценти од живородените деца. Тие се најчеста причина за смртност кај доенчињата уште во првата година од нивниот живот.
                        Според податоците од Државниот завод за статистика во 2016 година, во првата година од животот <strong>починале 273 доенчиња</strong>, додека при раѓање <strong>починале 195</strong>. Нема јавно достапна евиденција кои биле причините за смртноста на овие бебиња.
                        Според податоците од институтот за јавно здравје, во Македонија бројот на  жени кои умреле во текот на бременоста, породувањето или кратко по породувањето изнесува <strong>145</strong> во 2015 година.</i></p>
                        <p>Аномалиите во основа се пореметување на гените и хромозомите. Таквите промени настануваат поради наследна генетска причина или поради одредени болести на мајката за време на бременоста. Може да настанат и поради некои лекови кои мајката ги користи за време на бременоста или, пак, од непознати причини.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button id="restartBtn" class="btn btn-primary appointmentBtn restartBtn" data-toggle="modal" data-target="#myModal">Обидете се повторно</button>
                    </div>
                </div>
            </section>
        `;
$(() => {
//===================================== PRV PREGLED ============================
    let firstAppModalContent = `За вашиот прв преглед кај матичниот гинеколог и првите биохемиски лабораториски испитувања, со резултати, на лекар ќе треба да одите најмалку два пати. Со двете одења и враќања дома, поминавте`;
    let thirdAppModalContent = `За вашиот трет преглед кај матичниот гинеколог и првите биохемиски лабораториски испитувања, со резултати, на лекар ќе треба да одите најмалку два пати. Со двете одења и враќања дома, поминавте`;
    let fourthAppModalContent = `За вашиот четврти преглед кај матичниот гинеколог, како и за направените биохемиски и траснфузиолошки анализи  на лекар треба да одите неколку пати. Вкупно поминавте`;
    let fifthAppModalContent = `За вашиот петти преглед кај матичниот гинеколог, како и за направените микробиолошки вагинални брисеви и биохемиски анализи, на лекар треба да одите неколку пати. За овие контроли поминавте вкупно`;
    let sixthAppModalContent = "За вашиот шести преглед кај матичниот гинеколог и за направените стандардни биохемиски испитувања, со резултати, на лекар ќе треба да одите најмалку два пати. Со двете одења и враќања дома, поминавте";
    let seventhAppModalContent = "За вашиот седми преглед кај матичниот гинеколог, со одење и враќање дома, поминавте";
    let endOfPregnancyModalContent = "Вашата бременост заврши, поминавте";
    $gameContent.on("click", "#makeFirstApp", () => {
        $("#makeFirstApp").prop("disabled", true).addClass("pickedChoice");
        currentAppointment = 1;

        oneTest(hospitals, firstAppModalContent);

        $(firstApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#continueBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#continueBtn").addClass("pickedChoice");
        $(continueBtn).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#jumpAppBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#jumpAppBtn").addClass("pickedChoice");
        $(jumpAppBtn).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", ".abortBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".abortBtn").addClass("pickedChoice");
        $(abortBtn).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#abortBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".abortBtn").addClass("pickedChoice");
        $(abortBtnFirstApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", ".abortWithAnomalyBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".abortWithAnomalyBtn").addClass("pickedChoice");
        $(abortWithAnomalyBtn).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#submitAbortBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#submitAbortBtn").addClass("pickedChoice");
        let numbers = [1, 2]
        let number = numbers[Math.floor(Math.random() * numbers.length)];

        if (number == 1) {
            abortion(hospitals, "За да поднесете барање за абортус во болница и да се вратите дома, поминавте");
            $(submitAbortBtnFail).hide().appendTo("#gameContent").fadeIn(2000);
            $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
        } else {
            abortionFinal(hospitals, "За да ја извршите интервенцијата абортус и за да ја завршите бременоста во болница, поминавте");
            $(submitAbortBtnSuccess).hide().appendTo("#gameContent").fadeIn(2000);
            $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
        }
    });
    $gameContent.on("click", "#submitAbortBtnThirdApp", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#submitAbortBtnThirdApp").addClass("pickedChoice");
        let numbers = [1, 2]
        let number = numbers[Math.floor(Math.random() * numbers.length)];

        if (number == 1) {
            abortion(hospitals, "За да поднесете барање за прекин на бременост во болница, поминавте");
            $(submitAbortBtnFail).hide().appendTo("#gameContent").fadeIn(2000);
            $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
        } else {
            abortionFinal(hospitals, "За да ја прекинете бременоста во болница, поминавте");
            $(submitAbortBtnSuccess).hide().appendTo("#gameContent").fadeIn(2000);
            $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
        }
    })
    $gameContent.on("click", "#secCommisionYesBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#secCommisionYesBtn").addClass("pickedChoice");
        let numbers = [1, 2]
        let number = numbers[Math.floor(Math.random() * numbers.length)];

        if (number == 1) {
            abortion(hospitals, "За да поднесете барање за абортус во болница и да се вратите дома, поминавте");
            $(secCommisionYesBtnFail).hide().appendTo("#gameContent").fadeIn(2000);
            $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
        } else {
            abortionFinal(hospitals, "За да ја извршите интервенцијата абортус и за да ја завршите бременоста во болница, поминавте");
            $(secCommisionYesBtnSuccess).hide().appendTo("#gameContent").fadeIn(2000);
            $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
        }
    });
    $gameContent.on("click", "#secCommisionYesBtnFail", () => {
        $("#secCommisionYesBtnFail").prop("disabled", true).addClass("pickedChoice");
        switch (currentAppointment) {
            case 1:
                currentAppointment = 2;
                threeTests();
                $(secondApp).hide().appendTo("#gameContent").fadeIn(2000);
                $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
                break;
            case 2:
                currentAppointment = 3;
                oneTest(hospitals, thirdAppModalContent);
                
                $(thirdApp).hide().appendTo("#gameContent").fadeIn(2000);
                $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
                break;
            case 3:
                currentAppointment = 4;
                twoTests("laboratorija", "transfuziologija", fourthAppModalContent);
                
                $(fourthApp).hide().appendTo("#gameContent").fadeIn(2000);
                $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
                break;
            case 4:
                currentAppointment = 5;
                twoTests("laboratorija", "mikrobiologija", fifthAppModalContent);
                
                $(fifthApp).hide().appendTo("#gameContent").fadeIn(2000);
                $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
                break;
            case 5:
                currentAppointment = 6;
                oneTest(hospitals, sixthAppModalContent);
                $(sixthApp).hide().appendTo("#gameContent").fadeIn(2000);
                $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
                break;
            case 6:
                currentAppointment = 7;
                oneTest(hospitals, seventhAppModalContent);
                $(seventhApp).hide().appendTo("#gameContent").fadeIn(2000);
                $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
                break;
        }
    });
    $gameContent.on("click", "#goThroughWithAbortion", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#goThroughWithAbortion").addClass("pickedChoice");
        $(goThroughWithAbortion).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", ".finishAbortion", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".finishAbortion").removeClass("unpickedChoice").addClass("pickedChoice");
        $(finishAbortion).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", ".finishAbortionSecApp", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".finishAbortionSecApp").removeClass("unpickedChoice").addClass("pickedChoice");
        currentAppointment === 1 ? 
        $(finishAbortion).hide().appendTo("#gameContent").fadeIn(2000) :
        $(finishAbortionSecApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    })
    $gameContent.on("click", ".backBtn", () => {
        $(".abortionIntro").hide();
        $(".carryOnIntro").hide();

        $(".abortBtn").prop("disabled", false).removeClass("unpickedChoice").removeClass("pickedChoice");

        $(".abortBtn").prop("disabled", false).removeClass("unpickedChoice").removeClass("pickedChoice");
        $(".abortWithAnomalyBtn").prop("disabled", false).removeClass("unpickedChoice").removeClass("pickedChoice");
        $("#stopPregnancyBtn").prop("disabled", false).removeClass("unpickedChoice").removeClass("pickedChoice");

        $("#continueBtn").prop("disabled", false).removeClass("unpickedChoice").removeClass("pickedChoice");

        $("#forcedLabor").prop("disabled", false).removeClass("unpickedChoice").removeClass("pickedChoice");

        $("#forthAnommaly").prop("disabled", false).removeClass("unpickedChoice").removeClass("pickedChoice");

        $(".thirdApp").prop("disabled", false).removeClass("unpickedChoice").removeClass("pickedChoice");

    });
    $gameContent.on("click", ".cancelAbortion", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".cancelAbortion").prop("disabled", true).addClass("pickedChoice");
        switch (currentAppointment) {
            case 1:
                currentAppointment = 2;
                threeTests();
                $(secondApp).hide().appendTo("#gameContent").fadeIn(2000);
                $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
                break;
            case 2:
                currentAppointment = 3;
                oneTest(hospitals, thirdAppModalContent);
                $(thirdApp).hide().appendTo("#gameContent").fadeIn(2000);
                $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
                break;
            case 3:
                currentAppointment = 4;
                twoTests("laboratorija", "transfuziologija", fourthAppModalContent);
                $(fourthApp).hide().appendTo("#gameContent").fadeIn(2000);
                $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
                break;
            case 4:
                currentAppointment = 5;
                twoTests("laboratorija", "mikrobiologija", fifthAppModalContent);
                $(fifthApp).hide().appendTo("#gameContent").fadeIn(2000);
                $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
                break;
            case 5:
                currentAppointment = 6;
                oneTest(hospitals, sixthAppModalContent);
                $(sixthApp).hide().appendTo("#gameContent").fadeIn(2000);
                $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
                break;
            case 6:
                currentAppointment = 7;
                oneTest(hospitals, seventhAppModalContent);
                $(seventhApp).hide().appendTo("#gameContent").fadeIn(2000);
                $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
                break;
        }
    });
    $gameContent.on("click", "#jumpAllApp", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#jumpAllApp").addClass("pickedChoice");
        $gameContent.append(jumpAllBtn);
    });
//restart game 
    $gameContent.on("click", ".restartBtn", () => {
        $gameContent.hide();
        hospitals = [];
        currentAppointment = 0;
        totalDistanceTraveled = 0;
        distanceTraveledToHospital = 0;
        distanceTraveledToGynecologist = 0;
        totalDistanceTraveledToGynecologist = 0;
        municipalityChosen = false;
        $gameContent.goTo(1700);
        laboratorija = 0;
        mikrobiologija = 0;
        transfuziologija = 0;
    });
    $gameContent.on("click", ".repickBtn", () => {
        $gameContent.hide();
        $gameContent.goTo(1700);
    });
//===================================== VTOR PREGLED ===========================
    $gameContent.on("click", ".makeSecApp", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".makeSecApp").addClass("pickedChoice");
        currentAppointment = 2;
        threeTests();

        $(secondApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#goToHospitalBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#goToHospitalBtn").addClass("pickedChoice");

        $(goToHospitalBtn).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
//===================================== TRET PREGLED ===========================
    $gameContent.on("click", "#resultOkSecAppBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#resultOkSecAppBtn").addClass("pickedChoice");
        currentAppointment = 3;
        oneTest(hospitals, thirdAppModalContent);
        $(thirdApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#anomalySecAppBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#anomalySecAppBtn").addClass("pickedChoice");
        currentAppointment = 3;
        oneTest(hospitals, thirdAppModalContent);
        $(thirdApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#dangerOption", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#dangerOption").addClass("pickedChoice");
        currentAppointment = 3;
        oneTest(hospitals, thirdAppModalContent);
        $(thirdApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#nextAppBtnAnommaly", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#nextAppBtnAnommaly").addClass("pickedChoice");
        currentAppointment = 3;
        oneTest(hospitals, thirdAppModalContent);
        $(thirdApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#thirdExam_aditionalExamination", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#thirdExam_aditionalExamination").addClass("pickedChoice");
        $(thirdExam_aditionalExamination).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#endPregnancyThirdApp", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#endPregnancyThirdApp").addClass("pickedChoice");
        $(finishAbortion).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
        finishAbortion
    })
    $gameContent.on("click", "#anomaly", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#anomaly").addClass("pickedChoice");
        $(anomalyThirdApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#death", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#death").addClass("pickedChoice");
        $(death).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#forcedLabor", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#forcedLabor").addClass("pickedChoice");
        $(forcedLabor).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#stopPregnancyBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#stopPregnancyBtn").addClass("pickedChoice");
        $(stopPregnancyBtn).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#thirdCommisionYesBtn", () => {
            $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
            $("#thirdCommisionYesBtn").addClass("pickedChoice");
            let numbers = [1, 2]
            let number = numbers[Math.floor(Math.random() * numbers.length)];

            if (number == 1) {
                $(secCommisionYesBtnSuccessThirdApp).hide().appendTo("#gameContent").fadeIn(2000);
                $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
            } else {
                $(secCommisionYesBtnSuccessThirdApp).hide().appendTo("#gameContent").fadeIn(2000);
                $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
            }
        })
//===================================== CETVRT PREGLED =========================
    $gameContent.on("click", ".fourthAppointment", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".fourthAppointment").addClass("pickedChoice");
        currentAppointment = 4;
        twoTests("laboratorija", "transfuziologija", fourthAppModalContent);
        $(fourthApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#forthAnommaly", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#forthAnommaly").addClass("pickedChoice");
        currentAppointment = 4;
        twoTests("laboratorija", "transfuziologija", fourthAppModalContent);
        $(fourthApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#resultsOkThirdAppBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#resultsOkThirdAppBtn").addClass("pickedChoice");
        currentAppointment = 4;
        totalDistanceTraveledToGynecologist += hospitals[0].distance * 2;
        twoTests("laboratorija", "transfuziologija", fourthAppModalContent);
        $(fourthApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#goToHospitalBtnForthApp", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#goToHospitalBtnForthApp").addClass("pickedChoice");
        $(goToHospitalBtnForthApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", ".vagBleedingBtnFourth", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".vagBleedingBtnFourth").addClass("pickedChoice");
        $(vagBleedingBtnFourth).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#deathFourthApp", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#deathFourthApp").addClass("pickedChoice");
        $(embrionNotAliveFourthApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#deathForthAppBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#deathForthAppBtn").addClass("pickedChoice");
        $(deathForthAppBtn).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", ".anomalyForthApp", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".anomalyForthApp").addClass("pickedChoice");
        $(anomalyForthApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", ".finishAbortionForthApp", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".finishAbortionForthApp").addClass("pickedChoice");
        $(finishAbortionForthApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", ".vaginalBleedingFourthApp", () => {
            $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
            $(".vaginalBleedingFourthApp").addClass("pickedChoice");
            final(hospitals, endOfPregnancyModalContent);
            currentAppointment === 4 ?
            $(vaginalBleedingFourthApp).hide().appendTo("#gameContent").fadeIn(2000) :
            $(vaginalBleedingSixthApp).hide().appendTo("#gameContent").fadeIn(2000);
            $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
        })
//===================================== PETTI PREGLED ==========================
    $gameContent.on("click", ".fifthApp", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".fifthApp").addClass("pickedChoice");
        currentAppointment = 5;
        twoTests("laboratorija", "mikrobiologija", fifthAppModalContent);
        $(fifthApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#resultOkForthAppBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#resultOkForthAppBtn").addClass("pickedChoice");
        currentAppointment = 5;
        twoTests("laboratorija", "mikrobiologija", fifthAppModalContent);
        $(fifthApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#goToHospitalBtnFifthApp", () => {
        $("#goToHospitalBtnFifthApp").prop("disabled", true).addClass("pickedChoice");
        $(goToHospitalBtnFifthApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", ".birthPains", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".birthPains").addClass("pickedChoice");
        $(birthPains).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", ".finishPregnancy", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".finishPregnancy").addClass("pickedChoice");
        let numbers = [1, 2]
        let number = numbers[Math.floor(Math.random() * numbers.length)];

        if (number == 1) {
            final(hospitals, endOfPregnancyModalContent);
            $(finishPregnancyFail).hide().appendTo("#gameContent").fadeIn(2000);
            $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
        }
    });
    $gameContent.on("click", ".anomalyFifthApp", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".anomalyFifthApp").addClass("pickedChoice");
        $(anomalyFifthApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
//===================================== SESTI PREGLED ==========================
    $gameContent.on("click", ".sixthApp", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".sixthApp").addClass("pickedChoice");
        currentAppointment = 6;
        oneTest(hospitals, sixthAppModalContent);
        $(sixthApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#goodAnomalyFifthAppBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#goodAnomalyFifthAppBtn").addClass("pickedChoice");
        currentAppointment = 6;
        oneTest(hospitals, sixthAppModalContent);
        $(sixthApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#goToHospitalBtnSixthApp", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#goToHospitalBtnSixthApp").addClass("pickedChoice");
        $(goToHospitalSixthApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", ".laborPain", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".laborPain").addClass("pickedChoice");
        $(laborPainsBtn).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", ".anomalySixthApp", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".anomaly").addClass("pickedChoice");
        $(anomalySixthApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#sixthAnomaly", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#sixthAnomaly").addClass("pickedChoice");
        currentAppointment = 7;
        oneTest(hospitals, seventhAppModalContent);
        $(seventhApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", ".finishAbortionSixthApp", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".finishAbortionSixthApp").addClass("pickedChoice");
        $(vaginalBleedingSixthApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
//===================================== SEDMI PREGLED ==========================
    $gameContent.on("click", ".seventhApp", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".seventhApp").addClass("pickedChoice");
        currentAppointment = 7;
        oneTest(hospitals, seventhAppModalContent);
        $(seventhApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#sixthAnomaly", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#sixthAnomaly").addClass("pickedChoice");
        currentAppointment = 7;
        oneTest(hospitals, seventhAppModalContent);
        $(seventhApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#birthSeventhApp", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#birthSeventhApp").addClass("pickedChoice");
        $(birthSeventhApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#inductionBirthBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#inductionBirthBtn").addClass("pickedChoice");
        $(inductionBirthBtn).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", ".waterBrokeBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".waterBrokeBtn").addClass("pickedChoice");
        $(waterBrokeBtn).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#laborPainsBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#laborPainsBtn").addClass("pickedChoice");
        $(laborPainsBtn).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#vagBleedSeventhApp", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#vagBleedSeventhApp").addClass("pickedChoice");
        $(vagBleedSeventhApp).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", ".vaginaBirthBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".vaginaBirthBtn").addClass("pickedChoice");
        let numbers = [1, 2]
        let number = numbers[Math.floor(Math.random() * numbers.length)];

        if (number == 1) {
            final(hospitals, endOfPregnancyModalContent);
            $(vaginaBirthBtnSuccsess).hide().appendTo("#gameContent").fadeIn(2000);
            $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
        } else {
            final(hospitals, endOfPregnancyModalContent);
            $(vaginaBirthBtnFail).hide().appendTo("#gameContent").fadeIn(2000);
            $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
        }
    });
    $gameContent.on("click", ".cSectionBtn", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $(".cSectionBtn").addClass("pickedChoice");
        let numbers = [1, 2]
        let number = numbers[Math.floor(Math.random() * numbers.length)];

        if (number == 1) {
            final(hospitals, endOfPregnancyModalContent);
            $(cSectionBtnSuccsess).hide().appendTo("#gameContent").fadeIn(2000);
            $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
        } else {
            final(hospitals, endOfPregnancyModalContent);
            $(cSectionBtnFail).hide().appendTo("#gameContent").fadeIn(2000);
            $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
        }
    });
    $gameContent.on("click", "#emergencyLabor", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#emergencyLabor").addClass("pickedChoice");
        final(hospitals, endOfPregnancyModalContent);
        $(emergencyLabor).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
    $gameContent.on("click", "#emergencyCSection", () => {
        $(".fragment :button").prop("disabled", true).addClass("unpickedChoice");
        $("#emergencyCSection").addClass("pickedChoice");
        final(hospitals, endOfPregnancyModalContent);
        $(emergencyCSection).hide().appendTo("#gameContent").fadeIn(2000);
        $('body, html').animate({ scrollTop: $(".fragment").last().offset().top }, 1000);
    });
});



$("#goToGame").on("click", () => {
    $('body, html').animate({ scrollTop: $("#intro_text").last().offset().top }, 1000);
});