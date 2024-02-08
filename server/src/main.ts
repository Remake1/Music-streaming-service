import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


const start =  async () => {
    try {
        const PORT = process.env.PORT || 3000;
        const app = await NestFactory.create(AppModule);

        const config = new DocumentBuilder()
          .setTitle('Muz api docs')
          .setDescription('Api documentation for muz')
          .setVersion('1.0')
          .addTag('muz')
          .build()

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('doc', app, document)

        app.enableCors();
        await app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start()