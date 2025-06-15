import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { json, urlencoded } from 'express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  })

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  )
  app.use(json({ limit: '15mb' }))
  app.use(urlencoded({ limit: '15mb', extended: true, parameterLimit: 10000 }))

  app.setGlobalPrefix('/v1')

  const config = new DocumentBuilder()
    .setTitle('DFcom Product Review API')
    .setDescription(
      'API for registering and managing products and their customer reviews ' +
      'for marketplace sales.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)

  app.use(
    '/v1/docs',
    apiReference({
      metaData: {
        title: 'DFcom Product Review API',
      },
      spec: {
        content: document,
      },
    }),
  )

  await app.listen(process.env.PORT || 3333)
}

bootstrap()
