import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  typeofNotification: string;
  @IsString()
  @IsNotEmpty()
  typeId: string;
  @IsBoolean()
  @IsNotEmpty()
  Seen: boolean;
  @IsString()
  @IsUUID()
  userId: string;
}
