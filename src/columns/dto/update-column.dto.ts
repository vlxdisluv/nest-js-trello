import { IsString, IsDefined } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsDefined()
  readonly title: string;
}
