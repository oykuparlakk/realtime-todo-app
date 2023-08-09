import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DtoHelperService } from './dto/dto-helper.service';
import { UserController } from './controller/user.controller';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, DtoHelperService],
  exports: [UserService],
})
export class UserModule {}
