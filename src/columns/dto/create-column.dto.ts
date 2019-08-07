import { IsString, IsDefined } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsDefined()
  readonly title: string;
}
