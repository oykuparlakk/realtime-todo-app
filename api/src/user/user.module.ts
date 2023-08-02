import { UserService } from './services/user.service';
import { AuthModule } from '../auth/auth.module';
import { User } from './entities/user.entity';
import { DtoHelperService } from './dto/dto-helper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, DtoHelperService],
  exports: [UserService],
})
export class UserModule {}
