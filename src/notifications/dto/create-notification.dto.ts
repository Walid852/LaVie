import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  typeofNotification: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  typeId: string;
  @IsBoolean()
  @IsNotEmpty()
  Seen: boolean;
  @IsString()
  @IsUUID()
  userId: string;
}
export class NotificationResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  typeofNotification: string;

  @ApiProperty()
  typeId: string;

  @ApiProperty({ default: false })
  Seen: boolean;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: string;
}
