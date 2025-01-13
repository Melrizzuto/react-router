import style from "./Footer.module.css";

function Footer() {
    return (
        <footer className={`bg-dark text-white text-center p-3 mt-auto ${style.footer}`}>
            <p>
                Made with &hearts; by Melania
            </p>
        </footer>
    );
}

export default Footer;