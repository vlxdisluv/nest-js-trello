import { IsString, IsDefined } from 'class-validator';

export class UpdateCardDto {
  @IsString()
  @IsDefined()
  readonly title: string;

  @IsString()
  @IsDefined()
  readonly description: string;
}
