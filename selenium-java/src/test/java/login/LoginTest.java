package login;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.nio.file.Path;

import static org.testng.Assert.assertEquals;

import pages.login.LoginPage;

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

        driver = new ChromeDriver();
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

        driver.findElement(
                By.cssSelector("a[href='/login']")
        ).click();

        loginPage.preencherEmail(
                dados.get("usuarioValido")
                     .get("email")
                     .asText()
        );

        loginPage.preencherSenha(
                dados.get("usuarioValido")
                     .get("senha")
                     .asText()
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

        driver.findElement(
                By.cssSelector("a[href='/login']")
        ).click();

        loginPage.preencherEmail(
                dados.get("usuarioValido")
                     .get("email")
                     .asText()
        );

        loginPage.preencherSenha(
                dados.get("senhaInvalida")
                     .asText()
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

        driver.findElement(
                By.cssSelector("a[href='/login']")
        ).click();

        loginPage.preencherEmail(
                dados.get("emailNaoCadastrado")
                     .asText()
        );

        loginPage.preencherSenha(
                dados.get("usuarioValido")
                     .get("senha")
                     .asText()
        );

        loginPage.clicarLogin();

        loginPage.validarMensagemLoginInvalido();
    }

    // Email não preenchido
   // Email não preenchido
@Test
public void loginComEmailNaoPreenchido() {

    System.out.println(">>> INICIO DO TESTE - EMAIL OBRIGATORIO <<<");

    assertEquals(
            driver.getTitle(),
            "Automation Exercise"
    );

    driver.findElement(
            By.cssSelector("a[href='/login']")
    ).click();

    loginPage.preencherSenha(
            dados.get("usuarioValido")
                 .get("senha")
                 .asText()
    );

    loginPage.validarEmailObrigatorio();
}
    @AfterMethod
    public void fecharNavegador() {

        System.out.println(">>> FECHANDO NAVEGADOR <<<");

        driver.quit();
    }
}