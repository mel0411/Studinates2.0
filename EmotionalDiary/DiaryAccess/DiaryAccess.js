document.addEventListener(
    "DOMContentLoaded",
    function () {

        initSidebar();

        initActiveNavigation();

        initProfileMenu();

        initStudentProfile();

        initPasswordVisibility();

        initDiaryAccess();

        initForgotPassword();

        initBackButton();

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
   SIDEBAR ACTIVO

   Detecta automáticamente la página actual.
========================================================= */

function initActiveNavigation() {


    const menuItems =
        document.querySelectorAll(
            ".menu-item"
        );


    if (!menuItems.length) {

        return;

    }



    const currentPath =
        normalizePath(
            window.location.pathname
        );



    menuItems.forEach(
        function (item) {


            item.classList.remove(
                "active"
            );


            item.removeAttribute(
                "aria-current"
            );


            const href =
                item.getAttribute(
                    "href"
                );


            if (!href) {

                return;

            }


            const url =
                new URL(
                    href,
                    window.location.origin
                );


            const linkPath =
                normalizePath(
                    url.pathname
                );



            const exactMatch =
                currentPath ===
                linkPath;



            /*
                Cualquier página dentro de
                /EmotionalDiary/
                mantiene Diario emocional activo.
            */

            const diaryMatch =

                item.dataset.page ===
                "diario"

                &&

                currentPath.includes(
                    "/emotionaldiary/"
                );



            if (
                exactMatch ||
                diaryMatch
            ) {

                item.classList.add(
                    "active"
                );


                item.setAttribute(
                    "aria-current",
                    "page"
                );

            }

        }
    );

}



/* =========================================================
   NORMALIZAR URL
========================================================= */

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
   MENU PERFIL DEL HEADER
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
                "open",
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
                "open"
            );

        }
    );

}



/* =========================================================
   FOTO Y NOMBRE DEL ESTUDIANTE
========================================================= */


const PROFILE_PHOTO_KEY =
    "sentirStudentProfilePhoto";


const STUDENT_NAME_KEY =
    "sentirStudentName";



function initStudentProfile() {


    loadStudentPhoto();

    loadStudentName();



    /*
        Si StudentProfile cambia la foto
        desde otra pestaña, esta pantalla
        se actualiza automáticamente.
    */

    window.addEventListener(
        "storage",
        function (event) {


            if (
                event.key ===
                PROFILE_PHOTO_KEY
            ) {

                loadStudentPhoto();

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



/* =========================================================
   CARGAR FOTO
========================================================= */

function loadStudentPhoto() {


    const photo =
        localStorage.getItem(
            PROFILE_PHOTO_KEY
        );


    const avatars =
        document.querySelectorAll(
            "[data-profile-avatar]"
        );



    avatars.forEach(
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



/* =========================================================
   CARGAR NOMBRE
========================================================= */

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
   MOSTRAR / OCULTAR CLAVE
========================================================= */

function initPasswordVisibility() {


    const input =
        document.getElementById(
            "diaryPassword"
        );


    const button =
        document.getElementById(
            "showPassword"
        );


    if (
        !input ||
        !button
    ) {

        return;

    }



    button.addEventListener(
        "click",
        function () {


            const isPassword =
                input.type ===
                "password";


            input.type =
                isPassword
                    ? "text"
                    : "password";


            button.innerHTML =
                isPassword

                    ? '<i class="fa-regular fa-eye-slash"></i>'

                    : '<i class="fa-regular fa-eye"></i>';

        }
    );

}



/* =========================================================
   ACCESO AL DIARIO
========================================================= */

function initDiaryAccess() {


    const form =
        document.getElementById(
            "diaryLoginForm"
        );


    const input =
        document.getElementById(
            "diaryPassword"
        );


    const error =
        document.getElementById(
            "formError"
        );


    if (
        !form ||
        !input
    ) {

        return;

    }



    /*
        Solo permitir números.
    */

    input.addEventListener(
        "input",
        function () {


            input.value =
                input.value.replace(
                    /\D/g,
                    ""
                );


            if (error) {

                error.textContent =
                    "";

            }

        }
    );



    form.addEventListener(
        "submit",
        function (event) {


            event.preventDefault();



            const password =
                input.value.trim();



            if (
                password.length < 4
            ) {


                if (error) {

                    error.textContent =
                        "Ingresa tu clave para continuar.";

                }


                input.focus();


                return;

            }



            /*
            ==============================================
            CUANDO TENGAS BACKEND:

            AQUÍ SE DEBE VALIDAR LA CLAVE
            CONTRA LA BASE DE DATOS.

            Por ahora permitimos continuar
            si escribió entre 4 y 6 números.
            ==============================================
            */



            showToast(
                "Acceso correcto. Abriendo tu diario..."
            );



            setTimeout(
                function () {


                    /*
                        CAMBIA ESTA RUTA POR LA
                        PANTALLA PRINCIPAL DEL DIARIO.
                    */

                    window.location.href =
                        "/Sentir/Client/ScreenStudents/EmotionalDiary/Daily.html";


                },
                700
            );

        }
    );

}



/* =========================================================
   OLVIDÓ CLAVE
========================================================= */

function initForgotPassword() {


    const button =
        document.getElementById(
            "forgotPassword"
        );


    const modal =
        document.getElementById(
            "forgotModal"
        );


    const close =
        document.getElementById(
            "closeForgotModal"
        );


    if (
        !button ||
        !modal
    ) {

        return;

    }



    button.addEventListener(
        "click",
        function () {

            openModal(
                modal
            );

        }
    );



    if (close) {

        close.addEventListener(
            "click",
            function () {

                closeModal(
                    modal
                );

            }
        );

    }



    modal.addEventListener(
        "click",
        function (event) {


            if (
                event.target ===
                modal
            ) {

                closeModal(
                    modal
                );

            }

        }
    );

}



/* =========================================================
   BOTÓN VOLVER EN MÓVIL
========================================================= */

function initBackButton() {


    const button =
        document.getElementById(
            "backButton"
        );


    if (!button) {

        return;

    }



    button.addEventListener(
        "click",
        function () {


            if (
                window.history.length >
                1
            ) {

                window.history.back();

            }


            else {

                window.location.href =
                    "/Sentir/Client/ScreenStudents/Students.html";

            }

        }
    );

}



/* =========================================================
   MODALES
========================================================= */

function openModal(modal) {


    modal.classList.add(
        "show"
    );


    document.body.classList.add(
        "modal-open"
    );

}



function closeModal(modal) {


    modal.classList.remove(
        "show"
    );


    document.body.classList.remove(
        "modal-open"
    );

}



/* CERRAR CON ESC */

document.addEventListener(
    "keydown",
    function (event) {


        if (
            event.key !==
            "Escape"
        ) {

            return;

        }


        document
            .querySelectorAll(
                ".modal-overlay.show"
            )
            .forEach(
                function (modal) {

                    closeModal(
                        modal
                    );

                }
            );

    }
);



/* =========================================================
   TOAST
========================================================= */

let toastTimeout;



function showToast(message) {


    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {

        return;

    }


    clearTimeout(
        toastTimeout
    );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    toastTimeout =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2600
        );

}