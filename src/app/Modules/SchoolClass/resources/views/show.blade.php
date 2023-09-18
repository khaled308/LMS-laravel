@extends('dashboard::layouts.main')

@section('content')
<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h3 class="card-title">Subjects</h3>
                    </div>
                    <div class="card-body">
                        <div id="example2_wrapper" class="dataTables_wrapper dt-bootstrap4">
                            <div class="row">
                                <div class="col-sm-12">
                                    <form action="{{ route('classes.attach.subjects', $class->id) }}" method="post">
                                        @csrf
                                        <div class="checkbox-group">
                                            @foreach ($subjects as $subject)
                                                <div class="form-check mb-3">
                                                    <input type="checkbox" class="form-check-input" {{$classSubjects->contains($subject) ? 'checked' : ''}} name="subjects[]" id="subject-{{ $subject->id }}" value="{{$subject->id}}">
                                                    <label class="form-check-label" for="subject-{{ $subject->id }}">{{ $subject->name }}</label>
                                                </div>
                                            @endforeach
                                        </div>
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </form>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

    {{-- class teachers --}}
@endsection