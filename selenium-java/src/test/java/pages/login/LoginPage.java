package pages.login;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.testng.Assert.assertEquals;

public class LoginPage {

    private WebDriver driver;

    // =========================
    // Seletores
    // =========================

    private By linkLogin =
            By.cssSelector("a[href='/login']");

    private By campoEmail =
            By.cssSelector("[data-qa='login-email']");

    private By campoSenha =
            By.cssSelector("[data-qa='login-password']");

    private By botaoLogin =
            By.cssSelector("[data-qa='login-button']");

    private By botaoLogout =
            By.cssSelector("a[href='/logout']");

    // =========================
    // Mensagens
    // =========================

    private By mensagemLoginInvalido =
            By.cssSelector("p[style*='color: red']");

    // =========================
    // Construtor
    // =========================

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    // =========================
    // Navegação
    // =========================

    public void acessarTelaLogin() {

        WebDriverWait wait = new WebDriverWait(
                driver,
                Duration.ofSeconds(10)
        );

        WebElement link = wait.until(
                ExpectedConditions.elementToBeClickable(linkLogin)
        );

        link.click();
    }

    // =========================
    // Ações
    // =========================

    public void preencherEmail(String email) {
        driver.findElement(campoEmail).sendKeys(email);
    }

    public void preencherSenha(String senha) {
        driver.findElement(campoSenha).sendKeys(senha);
    }

    public void clicarLogin() {

        WebElement botao = driver.findElement(botaoLogin);

        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].scrollIntoView({block: 'center'});",
                botao
        );

        botao.click();
    }

    // =========================
    // Validações - Login
    // =========================

    public void validarLoginRealizado() {

        WebDriverWait wait = new WebDriverWait(
                driver,
                Duration.ofSeconds(10)
        );

        wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        botaoLogout
                )
        );
    }

    public void validarMensagemLoginInvalido() {

        WebDriverWait wait = new WebDriverWait(
                driver,
                Duration.ofSeconds(10)
        );

        wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        mensagemLoginInvalido
                )
        );
    }

    // =========================
    // Validações - Campos obrigatórios
    // =========================

    public void validarEmailObrigatorio() {

        WebElement campo = driver.findElement(campoEmail);

        assertEquals(
                campo.getDomAttribute("required"),
                "true"
        );
    }
}