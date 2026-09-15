package login;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.nio.file.Path;

import pages.login.LoginPage;

import static org.testng.Assert.assertEquals;

public class LoginTest {

    WebDriver driver;
    LoginPage loginPage;
    JsonNode dados;

    @BeforeMethod
    public void iniciarNavegador() throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();

        dados = objectMapper.readTree(
                Path.of("src/test/java/fixtures/login/login.json").toFile()
        );

        ChromeOptions options = new ChromeOptions();

        options.addArguments("--headless=new");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--window-size=1920,1080");

        driver = new ChromeDriver(options);

        driver.manage().window().maximize();

        driver.get("https://automationexercise.com/");

        loginPage = new LoginPage(driver);
    }

    // Login com dados válidos
    @Test
    public void loginComDadosValidos() {

        System.out.println(">>> INICIO DO TESTE - LOGIN VALIDO <<<");

        assertEquals(
                driver.getTitle(),
                "Automation Exercise"
        );

        loginPage.acessarTelaLogin();

        loginPage.preencherEmail(
                System.getenv("TEST_EMAIL")
        );

        loginPage.preencherSenha(
                System.getenv("TEST_PASSWORD")
        );

        loginPage.clicarLogin();

        loginPage.validarLoginRealizado();
    }

    // Login com senha inválida
    @Test
    public void loginComSenhaInvalida() {

        System.out.println(">>> INICIO DO TESTE - SENHA INVALIDA <<<");

        assertEquals(
                driver.getTitle(),
                "Automation Exercise"
        );

        loginPage.acessarTelaLogin();

        loginPage.preencherEmail(
                System.getenv("TEST_EMAIL")
        );

        loginPage.preencherSenha(
                dados.get("senhaInvalida").asText()
        );

        loginPage.clicarLogin();

        loginPage.validarMensagemLoginInvalido();
    }

    // Login com e-mail não cadastrado
    @Test
    public void loginComEmailNaoCadastrado() {

        System.out.println(">>> INICIO DO TESTE - EMAIL NAO CADASTRADO <<<");

        assertEquals(
                driver.getTitle(),
                "Automation Exercise"
        );

        loginPage.acessarTelaLogin();

        loginPage.preencherEmail(
                dados.get("emailNaoCadastrado").asText()
        );

        loginPage.preencherSenha(
                System.getenv("TEST_PASSWORD")
        );

        loginPage.clicarLogin();

        loginPage.validarMensagemLoginInvalido();
    }

    // Email não preenchido
    @Test
    public void loginComEmailNaoPreenchido() {

        System.out.println(">>> INICIO DO TESTE - EMAIL OBRIGATORIO <<<");

        assertEquals(
                driver.getTitle(),
                "Automation Exercise"
        );

        loginPage.acessarTelaLogin();

        loginPage.preencherSenha(
                System.getenv("TEST_PASSWORD")
        );

        loginPage.validarEmailObrigatorio();
    }

    @AfterMethod
    public void fecharNavegador() {

        System.out.println(">>> FECHANDO NAVEGADOR <<<");

        if (driver != null) {
            driver.quit();
        }
    }
}