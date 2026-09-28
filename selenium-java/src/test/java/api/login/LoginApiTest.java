package api.login;

import static io.restassured.RestAssured.given;
import static org.testng.Assert.assertEquals;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import java.nio.file.Path;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class LoginApiTest {

  JsonNode dados;

  @BeforeClass
  public void configurarApi() throws Exception {

    RestAssured.baseURI = "https://automationexercise.com";

    final ObjectMapper objectMapper = new ObjectMapper();

    dados = objectMapper.readTree(Path.of("src/test/java/fixtures/login/login.json").toFile());
  }

  /** */
  @Test
  public void loginComDadosValidos() {

    var response =
        given()
            .formParam("email", System.getenv("TEST_EMAIL"))
            .formParam("password", System.getenv("TEST_PASSWORD"))
            .when()
            .post("/api/verifyLogin")
            .then()
            .extract()
            .response();

    assertEquals(response.statusCode(), 200);
    assertEquals(response.jsonPath().getString("message"), "User exists!");

    System.out.println("HTTP Status: " + response.statusCode());
    System.out.println("Response Code: " + response.jsonPath().getInt("responseCode"));
    System.out.println("Message: " + response.jsonPath().getString("message"));
  }

  @AfterClass
  void afterClass() {}

  @Test
  public void loginComSenhaInvalida() {

    var response =
        given()
            .formParam("email", System.getenv("TEST_EMAIL"))
            .formParam("password", dados.get("senhaInvalida").asText())
            .when()
            .post("/api/verifyLogin")
            .then()
            .extract()
            .response();

    assertEquals(response.statusCode(), 200);
    assertEquals(response.jsonPath().getInt("responseCode"), 404);
    assertEquals(response.jsonPath().getString("message"), "User not found!");

    System.out.println("HTTP Status: " + response.statusCode());
    System.out.println("Response Code: " + response.jsonPath().getInt("responseCode"));
    System.out.println("Message: " + response.jsonPath().getString("message"));
  }

  @Test
  public void loginComEmailNaoCadastrado() {

    var response =
        given()
            .formParam("email", dados.get("emailNaoCadastrado").asText())
            .formParam("password", System.getenv("TEST_PASSWORD"))
            .when()
            .post("/api/verifyLogin")
            .then()
            .extract()
            .response();

    assertEquals(response.statusCode(), 200);
    assertEquals(response.jsonPath().getInt("responseCode"), 404);
    assertEquals(response.jsonPath().getString("message"), "User not found!");

    System.out.println("HTTP Status: " + response.statusCode());
    System.out.println("Response Code: " + response.jsonPath().getInt("responseCode"));
    System.out.println("Message: " + response.jsonPath().getString("message"));
  }

  @Test
  public void loginComEmailNaoPreenchido() {

    var response =
        given()
            .formParam("password", System.getenv("TEST_PASSWORD"))
            .when()
            .post("/api/verifyLogin")
            .then()
            .extract()
            .response();

    assertEquals(response.statusCode(), 200);
    assertEquals(response.jsonPath().getInt("responseCode"), 400);
    assertEquals(
        response.jsonPath().getString("message"),
        "Bad request, email or password parameter is missing in POST request.");

    System.out.println("HTTP Status: " + response.statusCode());
    System.out.println("Response Code: " + response.jsonPath().getInt("responseCode"));
    System.out.println("Message: " + response.jsonPath().getString("message"));
  }
}
