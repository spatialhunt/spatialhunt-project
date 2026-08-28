/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { AddPhotoDto } from './dto/add-photo.dto';
@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.propertiesService.findAll(query);
  }

  @Get('mine')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.LANDLORD)
  findMine(@Request() req: any) {
    return this.propertiesService.findMine(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.LANDLORD)
  create(@Request() req: any, @Body() dto: CreatePropertyDto) {
    return this.propertiesService.create(req.user.userId, dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.LANDLORD)
  update(
    @Param('id') id: string,
    @Request() req: any,
    @Body() dto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(id, req.user.userId, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.LANDLORD)
  remove(@Param('id') id: string, @Request() req: any) {
    return this.propertiesService.remove(id, req.user.userId);
  }

  @Post(':id/photos')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.LANDLORD)
  addPhoto(
    @Param('id') id: string,
    @Request() req: any,
    @Body() dto: AddPhotoDto,
  ) {
    return this.propertiesService.addPhoto(id, req.user.userId, dto);
  }

  @Delete(':id/photos/:photoId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.LANDLORD)
  removePhoto(
    @Param('id') id: string,
    @Param('photoId') photoId: string,
    @Request() req: any,
  ) {
    return this.propertiesService.removePhoto(id, photoId, req.user.userId);
  }
  @Patch(':id/submit')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.LANDLORD)
  submitForVerification(@Param('id') id: string, @Request() req: any) {
    return this.propertiesService.submitForVerification(id, req.user.userId);
  }
}
