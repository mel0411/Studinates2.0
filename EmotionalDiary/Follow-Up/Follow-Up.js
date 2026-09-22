document.addEventListener(
    "DOMContentLoaded",
    function () {

        initSidebar();

        initActiveNavigation();

        initProfileMenu();

        initProfileSync();

        buildTrackingPage();

    }
);


/* =========================================================
   SIDEBAR
========================================================= */

function initSidebar() {

    const menuButton =
        document.getElementById(
            "mobileMenu"
        );


    const sidebar =
        document.getElementById(
            "sidebar"
        );


    const overlay =
        document.getElementById(
            "sidebarOverlay"
        );


    if (
        !menuButton ||
        !sidebar ||
        !overlay
    ) {

        return;

    }


    function openSidebar() {

        sidebar.classList.add(
            "open"
        );


        overlay.classList.add(
            "active"
        );


        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );


        document.body.style.overflow =
            "hidden";

    }


    function closeSidebar() {

        sidebar.classList.remove(
            "open"
        );


        overlay.classList.remove(
            "active"
        );


        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );


        document.body.style.overflow =
            "";

    }


    menuButton.addEventListener(
        "click",
        function () {

            if (
                sidebar.classList.contains(
                    "open"
                )
            ) {

                closeSidebar();

            }

            else {

                openSidebar();

            }

        }
    );


    overlay.addEventListener(
        "click",
        closeSidebar
    );


    document
        .querySelectorAll(
            ".menu-item"
        )
        .forEach(
            function (item) {

                item.addEventListener(
                    "click",
                    function () {

                        if (
                            window.innerWidth <=
                            920
                        ) {

                            closeSidebar();

                        }

                    }
                );

            }
        );


    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth >
                920
            ) {

                closeSidebar();

            }

        }
    );

}


/* =========================================================
   ACTIVE SIDEBAR
========================================================= */

function initActiveNavigation() {

    const links =
        document.querySelectorAll(
            ".menu-item"
        );


    const current =
        normalizePath(
            window.location.pathname
        );


    links.forEach(
        function (link) {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute(
                    "href"
                );


            if (!href) {

                return;

            }


            const linkPath =
                normalizePath(

                    new URL(
                        href,
                        window.location.origin
                    ).pathname

                );


            const trackingMatch =

                link.dataset.page ===
                "seguimiento"

                &&

                (
                    current.includes(
                        "/follow-up/"
                    )

                    ||

                    current.includes(
                        "/followup/"
                    )

                    ||

                    current.includes(
                        "/seguimiento/"
                    )
                );


            if (
                current === linkPath ||
                trackingMatch
            ) {

                link.classList.add(
                    "active"
                );


                link.setAttribute(
                    "aria-current",
                    "page"
                );

            }

        }
    );

}


function normalizePath(path) {

    return (
        path || ""
    )
        .split("?")[0]
        .split("#")[0]
        .replace(
            /\/+/g,
            "/"
        )
        .replace(
            /\/$/,
            ""
        )
        .toLowerCase();

}


/* =========================================================
   HEADER PROFILE
========================================================= */

function initProfileMenu() {

    const button =
        document.getElementById(
            "profileButton"
        );


    const menu =
        document.getElementById(
            "profileMenu"
        );


    if (
        !button ||
        !menu
    ) {

        return;

    }


    button.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            const open =
                !menu.classList.contains(
                    "show"
                );


            menu.classList.toggle(
                "show",
                open
            );


            button.classList.toggle(
                "is-open",
                open
            );

        }
    );


    menu.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );


    document.addEventListener(
        "click",
        function () {

            menu.classList.remove(
                "show"
            );


            button.classList.remove(
                "is-open"
            );

        }
    );

}


/* =========================================================
   PROFILE PHOTO SYNC
========================================================= */

const PROFILE_PHOTO_KEY =
    "sentirStudentProfilePhoto";


const STUDENT_NAME_KEY =
    "sentirStudentName";


function initProfileSync() {

    loadProfilePhoto();

    loadStudentName();


    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key ===
                PROFILE_PHOTO_KEY
            ) {

                loadProfilePhoto();

            }


            if (
                event.key ===
                STUDENT_NAME_KEY
            ) {

                loadStudentName();

            }

        }
    );

}


function loadProfilePhoto() {

    const photo =
        localStorage.getItem(
            PROFILE_PHOTO_KEY
        );


    document
        .querySelectorAll(
            "[data-profile-avatar]"
        )
        .forEach(
            function (avatar) {

                const image =
                    avatar.querySelector(
                        ".profile-avatar-image"
                    );


                const fallback =
                    avatar.querySelector(
                        ".profile-avatar-fallback"
                    );


                if (
                    !image ||
                    !fallback
                ) {

                    return;

                }


                if (photo) {

                    image.src =
                        photo;


                    image.hidden =
                        false;


                    fallback.hidden =
                        true;

                }


                else {

                    image.hidden =
                        true;


                    fallback.hidden =
                        false;

                }

            }
        );

}


function loadStudentName() {

    const name =
        localStorage.getItem(
            STUDENT_NAME_KEY
        )
        ||
        "Ana";


    document
        .querySelectorAll(
            "[data-student-name]"
        )
        .forEach(
            function (element) {

                element.textContent =
                    name;

            }
        );


    const firstLetter =
        name
            .trim()
            .charAt(0)
            .toUpperCase()
        ||
        "A";


    document
        .querySelectorAll(
            ".profile-avatar-fallback"
        )
        .forEach(
            function (element) {

                element.textContent =
                    firstLetter;

            }
        );

}


/* =========================================================
   DATA
========================================================= */

function getDiaryEntries() {

    const stored =
        localStorage.getItem(
            "sentirDiaryEntries"
        );


    if (!stored) {

        return [];

    }


    try {

        const entries =
            JSON.parse(
                stored
            );


        return Array.isArray(
            entries
        )
            ? entries
            : [];

    }


    catch {

        return [];

    }

}


/* =========================================================
   BUILD PAGE
========================================================= */

function buildTrackingPage() {

    const entries =
        getDiaryEntries();


    const weeklyData =
        getWeeklyData(
            entries
        );


    renderWeeklyChart(
        weeklyData
    );


    renderBalance(
        entries
    );


    renderStreak(
        entries
    );

}


/* =========================================================
   WEEKLY DATA

   mood:
   5 = Muy bien
   4 = Bien
   3 = Regular
   2 = Mal
   1 = Muy mal
========================================================= */

function getWeeklyData(entries) {

    const dayNames = [
        "Lun",
        "Mar",
        "Mié",
        "Jue",
        "Vie",
        "Sáb",
        "Dom"
    ];


    /*
       Si todavía no existen suficientes
       registros usamos valores visuales
       de ejemplo similares al mockup.
    */

    if (
        entries.length <
        3
    ) {

        return [

            {
                day: "Lun",
                value: 5,
                emotion: "Muy bien"
            },

            {
                day: "Mar",
                value: 4,
                emotion: "Bien"
            },

            {
                day: "Mié",
                value: 3,
                emotion: "Regular"
            },

            {
                day: "Jue",
                value: 2,
                emotion: "Mal"
            },

            {
                day: "Vie",
                value: 4,
                emotion: "Bien"
            },

            {
                day: "Sáb",
                value: 4,
                emotion: "Bien"
            },

            {
                day: "Dom",
                value: 5,
                emotion: "Muy bien"
            }

        ];

    }


    const today =
        new Date();


    /*
       Convertimos fecha actual
       al lunes de esta semana.
    */

    const day =
        today.getDay();


    const diffToMonday =
        day === 0
            ? -6
            : 1 - day;


    const monday =
        new Date(
            today
        );


    monday.setHours(
        0,
        0,
        0,
        0
    );


    monday.setDate(
        today.getDate() +
        diffToMonday
    );


    const result = [];


    for (
        let index = 0;
        index < 7;
        index++
    ) {

        const date =
            new Date(
                monday
            );


        date.setDate(
            monday.getDate() +
            index
        );


        const matchingEntries =
            entries.filter(
                function (entry) {

                    const entryDate =
                        new Date(
                            entry.createdAt
                        );


                    return sameDate(
                        entryDate,
                        date
                    );

                }
            );


        let selectedEntry =
            matchingEntries[
                matchingEntries.length - 1
            ];


        /*
           Si no hubo registro ese día,
           usamos Regular para no romper
           visualmente la gráfica.
        */

        const value =
            selectedEntry
                ? Number(
                    selectedEntry.emotionValue ||
                    emotionToValue(
                        selectedEntry.emotion
                    )
                )
                : 3;


        result.push({

            day:
                dayNames[index],

            value:
                value,

            emotion:
                selectedEntry
                    ? selectedEntry.emotion
                    : valueToEmotion(
                        value
                    )

        });

    }


    return result;

}


/* =========================================================
   WEEKLY CHART
========================================================= */

function renderWeeklyChart(data) {

    const linePath =
        document.getElementById(
            "moodLinePath"
        );


    const areaPath =
        document.getElementById(
            "moodAreaPath"
        );


    const pointsGroup =
        document.getElementById(
            "chartPoints"
        );


    const emojiLayer =
        document.getElementById(
            "chartEmojiLayer"
        );


    const daysContainer =
        document.getElementById(
            "chartDays"
        );


    if (
        !linePath ||
        !areaPath ||
        !pointsGroup ||
        !emojiLayer ||
        !daysContainer
    ) {

        return;

    }


    const width =
        700;


    const top =
        25;


    const bottom =
        225;


    const usableHeight =
        bottom - top;


    const xStep =
        width /
        (
            data.length - 1
        );


    const points =
        data.map(
            function (item, index) {

                const x =
                    index *
                    xStep;


                /*
                   5 arriba,
                   1 abajo.
                */

                const normalized =
                    (
                        5 -
                        item.value
                    )
                    /
                    4;


                const y =
                    top +
                    (
                        normalized *
                        usableHeight
                    );


                return {

                    ...item,

                    x:
                        x,

                    y:
                        y

                };

            }
        );


    /*
       Línea suave.
    */

    const line =
        buildSmoothPath(
            points
        );


    linePath.setAttribute(
        "d",
        line
    );


    const area =

        line +

        ` L ${points[points.length - 1].x} ${bottom}` +

        ` L ${points[0].x} ${bottom} Z`;


    areaPath.setAttribute(
        "d",
        area
    );


    /* Puntos */

    pointsGroup.innerHTML =
        "";


    emojiLayer.innerHTML =
        "";


    daysContainer.innerHTML =
        "";


    points.forEach(
        function (point) {

            const circle =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                );


            circle.setAttribute(
                "cx",
                point.x
            );


            circle.setAttribute(
                "cy",
                point.y
            );


            circle.setAttribute(
                "r",
                "8"
            );


            circle.setAttribute(
                "class",
                "chart-point"
            );


            pointsGroup.appendChild(
                circle
            );


            /* Emoji */

            const emoji =
                document.createElement(
                    "div"
                );


            emoji.className =
                "chart-emoji";


            emoji.style.left =
                (
                    point.x /
                    width *
                    100
                )
                +
                "%";


            emoji.style.top =
                (
                    point.y /
                    250 *
                    100
                )
                +
                "%";


            emoji.innerHTML =
                buildSentirEmoji(
                    point.emotion
                );


            emojiLayer.appendChild(
                emoji
            );


            /* Día */

            const day =
                document.createElement(
                    "span"
                );


            day.textContent =
                point.day;


            daysContainer.appendChild(
                day
            );

        }
    );

}


/* =========================================================
   SVG PATH SUAVE
========================================================= */

function buildSmoothPath(points) {

    if (!points.length) {

        return "";

    }


    let path =
        `M ${points[0].x} ${points[0].y}`;


    for (
        let i = 1;
        i < points.length;
        i++
    ) {

        const previous =
            points[i - 1];


        const current =
            points[i];


        const middleX =
            (
                previous.x +
                current.x
            )
            /
            2;


        path +=

            ` C ${middleX} ${previous.y},` +

            ` ${middleX} ${current.y},` +

            ` ${current.x} ${current.y}`;

    }


    return path;

}


/* =========================================================
   EMOJI SENTIR

   IMPORTANTE:
   Son las mismas estructuras de los emojis
   que hemos usado en Students/Diario.
   Aquí están SIEMPRE A COLOR
   y el CSS les da movimiento infinito.
========================================================= */

function buildSentirEmoji(
    emotion
) {

    switch (
        emotion
    ) {


        case "Muy bien":

            return `
                <div class="sentir-emoji very-good happy">
                    <input type="radio" checked tabindex="-1">

                    <div>
                        <svg class="eye left">
                            <use href="#eye"></use>
                        </svg>

                        <svg class="eye right">
                            <use href="#eye"></use>
                        </svg>
                    </div>
                </div>
            `;


        case "Bien":

            return `
                <div class="sentir-emoji good">
                    <input type="radio" checked tabindex="-1">

                    <div>
                        <svg class="eye left">
                            <use href="#eye"></use>
                        </svg>

                        <svg class="eye right">
                            <use href="#eye"></use>
                        </svg>

                        <svg class="mouth">
                            <use href="#mouth"></use>
                        </svg>
                    </div>
                </div>
            `;


        case "Regular":

            return `
                <div class="sentir-emoji regular ok">
                    <input type="radio" checked tabindex="-1">

                    <div></div>
                </div>
            `;


        case "Mal":

            return `
                <div class="sentir-emoji bad sad">
                    <input type="radio" checked tabindex="-1">

                    <div>
                        <svg class="eye left">
                            <use href="#eye"></use>
                        </svg>

                        <svg class="eye right">
                            <use href="#eye"></use>
                        </svg>

                        <svg class="mouth">
                            <use href="#mouth"></use>
                        </svg>
                    </div>
                </div>
            `;


        case "Muy mal":

            return `
                <div class="sentir-emoji very-bad angry">
                    <input type="radio" checked tabindex="-1">

                    <div>
                        <svg class="eye left">
                            <use href="#eye"></use>
                        </svg>

                        <svg class="eye right">
                            <use href="#eye"></use>
                        </svg>

                        <svg class="mouth">
                            <use href="#mouth"></use>
                        </svg>
                    </div>
                </div>
            `;


        default:

            return buildSentirEmoji(
                "Regular"
            );

    }

}


/* =========================================================
   BALANCE
========================================================= */

function renderBalance(entries) {

    /*
       Si no hay suficiente información:
       mostramos la distribución del diseño.
    */

    let percentages = {

        veryGood:
            35,

        good:
            25,

        regular:
            20,

        bad:
            12,

        veryBad:
            8

    };


    let balance =
        78;


    if (
        entries.length >=
        3
    ) {

        const counts = {

            "Muy bien":
                0,

            "Bien":
                0,

            "Regular":
                0,

            "Mal":
                0,

            "Muy mal":
                0

        };


        let totalScore =
            0;


        entries.forEach(
            function (entry) {

                const emotion =
                    entry.emotion ||
                    "Regular";


                if (
                    counts[
                        emotion
                    ] !== undefined
                ) {

                    counts[
                        emotion
                    ]++;

                }


                totalScore +=

                    Number(
                        entry.emotionValue ||
                        emotionToValue(
                            emotion
                        )
                    );

            }
        );


        const total =
            entries.length;


        percentages = {

            veryGood:
                Math.round(
                    counts["Muy bien"] /
                    total *
                    100
                ),

            good:
                Math.round(
                    counts["Bien"] /
                    total *
                    100
                ),

            regular:
                Math.round(
                    counts["Regular"] /
                    total *
                    100
                ),

            bad:
                Math.round(
                    counts["Mal"] /
                    total *
                    100
                ),

            veryBad:
                0

        };


        /*
           Último porcentaje recibe diferencia
           para asegurar total = 100.
        */

        percentages.veryBad =

            100
            -
            percentages.veryGood
            -
            percentages.good
            -
            percentages.regular
            -
            percentages.bad;


        balance =
            Math.round(

                totalScore

                /

                (
                    total *
                    5
                )

                *

                100

            );

    }


    document.getElementById(
        "balancePercentage"
    ).textContent =
        balance + "%";


    document.getElementById(
        "legendVeryGood"
    ).textContent =
        percentages.veryGood +
        "%";


    document.getElementById(
        "legendGood"
    ).textContent =
        percentages.good +
        "%";


    document.getElementById(
        "legendRegular"
    ).textContent =
        percentages.regular +
        "%";


    document.getElementById(
        "legendBad"
    ).textContent =
        percentages.bad +
        "%";


    document.getElementById(
        "legendVeryBad"
    ).textContent =
        percentages.veryBad +
        "%";


    const a =
        percentages.veryGood;


    const b =
        a +
        percentages.good;


    const c =
        b +
        percentages.regular;


    const d =
        c +
        percentages.bad;


    const donut =
        document.getElementById(
            "donutChart"
        );


    donut.style.background =

        `conic-gradient(

            #67ca9c 0% ${a}%,

            #ffd568 ${a}% ${b}%,

            #9476ef ${b}% ${c}%,

            #ff9a68 ${c}% ${d}%,

            #ff716e ${d}% 100%

        )`;

}


/* =========================================================
   STREAK
========================================================= */

function renderStreak(entries) {

    const container =
        document.getElementById(
            "weekStreak"
        );


    const number =
        document.getElementById(
            "streakDays"
        );


    if (
        !container ||
        !number
    ) {

        return;

    }


    const labels = [

        "Lun",

        "Mar",

        "Mié",

        "Jue",

        "Vie",

        "Sáb",

        "Dom"

    ];


    let completed =
        5;


    if (
        entries.length
    ) {

        completed =
            calculateCurrentStreak(
                entries
            );


        completed =
            Math.min(
                completed,
                7
            );

    }


    number.textContent =
        completed;


    container.innerHTML =
        "";


    labels.forEach(
        function (
            label,
            index
        ) {

            const day =
                document.createElement(
                    "div"
                );


            day.className =
                "streak-day";


            if (
                index <
                completed
            ) {

                day.classList.add(
                    "completed"
                );

            }


            day.innerHTML = `

                <div class="streak-circle">

                    ${
                        index <
                        completed

                            ? '<i class="fa-solid fa-check"></i>'

                            : ""
                    }

                </div>

                <span>
                    ${label}
                </span>

            `;


            container.appendChild(
                day
            );

        }
    );

}


/* =========================================================
   RACHA REAL
========================================================= */

function calculateCurrentStreak(entries) {

    const uniqueDates =
        [
            ...new Set(

                entries.map(
                    function (entry) {

                        return dateKey(
                            new Date(
                                entry.createdAt
                            )
                        );

                    }
                )

            )
        ];


    let streak =
        0;


    let cursor =
        new Date();


    cursor.setHours(
        0,
        0,
        0,
        0
    );


    /*
       Si hoy todavía no registró nada,
       permitimos empezar desde ayer.
    */

    if (
        !uniqueDates.includes(
            dateKey(
                cursor
            )
        )
    ) {

        cursor.setDate(
            cursor.getDate() -
            1
        );

    }


    while (
        uniqueDates.includes(
            dateKey(
                cursor
            )
        )
    ) {

        streak++;


        cursor.setDate(
            cursor.getDate() -
            1
        );

    }


    return streak;

}


/* =========================================================
   HELPERS
========================================================= */

function emotionToValue(
    emotion
) {

    switch (
        emotion
    ) {

        case "Muy bien":
            return 5;

        case "Bien":
            return 4;

        case "Regular":
            return 3;

        case "Mal":
            return 2;

        case "Muy mal":
            return 1;

        default:
            return 3;

    }

}


function valueToEmotion(
    value
) {

    switch (
        Number(
            value
        )
    ) {

        case 5:
            return "Muy bien";

        case 4:
            return "Bien";

        case 3:
            return "Regular";

        case 2:
            return "Mal";

        case 1:
            return "Muy mal";

        default:
            return "Regular";

    }

}


function sameDate(
    first,
    second
) {

    return (

        first.getFullYear() ===
        second.getFullYear()

        &&

        first.getMonth() ===
        second.getMonth()

        &&

        first.getDate() ===
        second.getDate()

    );

}


function dateKey(
    date
) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() +
            1
        )
        .padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        )
        .padStart(
            2,
            "0"
        );


    return (
        year +
        "-" +
        month +
        "-" +
        day
    );

}